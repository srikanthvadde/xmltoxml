package com.psi.psi_incontro.xmltool.xmltool.services;

import com.psi.psi_incontro.xmltool.xmltool.viewmodals.AttributeViewModal;
import com.psi.psi_incontro.xmltool.xmltool.viewmodals.GenerateXmlViewModal;
import com.psi.psi_incontro.xmltool.xmltool.viewmodals.ResponsePayloadModel;
import com.psi.psi_incontro.xmltool.xmltool.viewmodals.ResponseViewModal;
import org.apache.logging.log4j.util.Strings;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Parser;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


/**
 * @author Srikanth v
 */
@Service
public class XmlConversionService {


    public ResponsePayloadModel<ResponseViewModal> getHeadersFromExcel(MultipartFile file, ResponsePayloadModel<ResponseViewModal> payloadModel) throws Exception {

        try {
            List<ResponseViewModal> headerList = new ArrayList<>();
            List<Map<String, Object>> jsonString = new ArrayList<>();
            InputStream fInputStream = file.getInputStream();
            Workbook workbook = XmlConversionService.getWorkbook(fInputStream, file.getOriginalFilename());
            Sheet firstSheet = workbook.getSheetAt(0);
            System.out.println(firstSheet.getSheetName());
            Row row = firstSheet.getRow(0);
            int cells = row.getLastCellNum();
            for (int i = 0; i <= cells; i++) {
                Cell cell = row.getCell(i);
                if (cell != null && !cell.getStringCellValue().isEmpty()) {
                    ResponseViewModal responseViewModal = new ResponseViewModal();
                    responseViewModal.setTagName(cell.getRichStringCellValue().toString());
                    headerList.add(responseViewModal);

                }
            }

            List<List<String>> sheetDataTable = getSheetDataList(firstSheet);
            jsonString = getJSONStringFromList(sheetDataTable);
            payloadModel.setListData(headerList);
            payloadModel.setAllData(jsonString);

        } catch (Exception e) {
            payloadModel.setResult("fail");
            payloadModel.setListData(null);
            payloadModel.setAllData(null);
        }

        return payloadModel;
    }


    /* Return a JSON string from the string list. */
    public static List<Map<String, Object>> getJSONStringFromList(List<List<String>> dataTable) {
        List<Map<String, Object>> tableJsonObject = new ArrayList<>();

        try {
            if (dataTable != null) {
                int rowCount = dataTable.size();
                if (rowCount > 1) {

                    List<String> headerRow = dataTable.get(0);
                    int columnCount = headerRow.size();

                    for (int i = 1; i < rowCount; i++) {

                        List<String> dataRow = dataTable.get(i);
                        Map<String, Object> rowJsonObject = new HashMap<>();

                        for (int j = 0; j < columnCount; j++) {

                            String columnName = headerRow.get(j);
                            String columnValue = dataRow.get(j);
                            rowJsonObject.put(columnName, columnValue);

                        }
                        tableJsonObject.add(rowJsonObject);
                    }

                }
            }
        } catch (Exception e) {
        }
        return tableJsonObject;
    }


    private static List<List<String>> getSheetDataList(Sheet sheet) {
        List<List<String>> ret = new ArrayList<List<String>>();

        int firstRowNum = 0;
        int lastRowNum = sheet.getLastRowNum();

        if (lastRowNum > 0) {

            for (int i = firstRowNum; i < lastRowNum + 1; i++) {

                Row row = sheet.getRow(i);

                if (checkRowempty(row)) {
                    int firstCellNum = 0;
                    int lastCellNum = sheet.getRow(0).getLastCellNum();
                    List<String> rowDataList = new ArrayList<String>();
                    for (int j = firstCellNum; j <= lastCellNum; j++) {
                        Cell cell = row.getCell(j);
                        if (cell == null) {
                            cell = row.createCell(j);
                            cell.setCellType(Cell.CELL_TYPE_BLANK);
                        }
                        formTheListforAllCells(cell, rowDataList);
                    }

                    ret.add(rowDataList);
                }
            }
        }
        return ret;
    }


    // to remove empty rows
    public static boolean checkRowempty(Row row) {
        int firstCellNum = 0;
        boolean ind = false;
        if (row != null) {
            int lastCellNum = row.getLastCellNum();

            for (int j = firstCellNum; j < lastCellNum; j++) {
                Cell cell = row.getCell(j);

                if (cell != null) {
                    int cellType = cell.getCellType();
                    if (cellType != Cell.CELL_TYPE_BLANK)
                        ind = true;
                    break;

                }
            }

        }
        return ind;
    }


    public static void formTheListforAllCells(Cell cell, List<String> rowDataList) {

        if (cell != null) {
            int cellType = cell.getCellType();
            if (cellType == Cell.CELL_TYPE_STRING) {
                rowDataList.add(cell.getStringCellValue());
            } else if (cellType == Cell.CELL_TYPE_BOOLEAN) {
                rowDataList.add(String.valueOf(cell.getBooleanCellValue()));
            } else if (cellType == Cell.CELL_TYPE_NUMERIC || cellType == Cell.CELL_TYPE_FORMULA) {
                if (cellType == Cell.CELL_TYPE_NUMERIC && DateUtil.isCellDateFormatted(cell)) {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                    rowDataList.add(dateFormat.format(cell.getDateCellValue()));
                } else if (cellType == Cell.CELL_TYPE_FORMULA) {
                    switch (cell.getCachedFormulaResultType()) {
                        case Cell.CELL_TYPE_NUMERIC:

                            if (cell.getCellStyle().getDataFormatString().contains("%")) {
                                Double value = cell.getNumericCellValue() * 100;
                                rowDataList.add(String.valueOf(value));
                            } else {
                                Double value = cell.getNumericCellValue();
                                rowDataList.add(String.valueOf(value));
                            }

                            break;
                        case Cell.CELL_TYPE_STRING:
                            rowDataList.add(String.valueOf(cell.getRichStringCellValue()));
                            break;
                        case Cell.CELL_TYPE_ERROR:
                            rowDataList.add(String.valueOf(cell.getErrorCellValue()));
                            break;
                    }
                } else {
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    String numberValue = cell.getStringCellValue();
                    // String stringCellValue = BigDecimal.valueOf(numberValue).toPlainString();
                    rowDataList.add(numberValue);
                }

            } else if (cellType == Cell.CELL_TYPE_BLANK) {
                rowDataList.add(String.valueOf(cell.getStringCellValue()));
            } else if (cellType == Cell.CELL_TYPE_ERROR) {
                rowDataList.add(String.valueOf(cell.getErrorCellValue()));
            }
        }
    }


    // handling of both xlsx and xls formats
    public static Workbook getWorkbook(InputStream inputStream, String excelFilePath) throws Exception {
        Workbook workbook = null;

        try {
            if (excelFilePath.endsWith("xlsx")) {
                workbook = new XSSFWorkbook(inputStream);
            } else if (excelFilePath.endsWith("xls")) {
                workbook = new HSSFWorkbook(inputStream);
            } else {
                throw new IllegalArgumentException("The specified file is not Excel file");
            }
        } catch (Exception e) {
        }

        return workbook;
    }


    public ResponsePayloadModel<ResponseViewModal>  getXmlTags(MultipartFile file,ResponsePayloadModel<ResponseViewModal> responsePayLoad) throws ParserConfigurationException, IOException, SAXException, TransformerException
    {
        List<ResponseViewModal> viewModals = new ArrayList<>();
        List<String> stringList = new ArrayList<>();
        DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
        Document doc = docBuilder.parse(file.getInputStream());

        NodeList nodesMain = doc.getElementsByTagName("*");

        for (int idx = 0; idx < nodesMain.getLength(); idx++)
        {
            Node nodeMin = nodesMain.item(idx);
            ResponseViewModal viewModal = new ResponseViewModal();
            viewModal.setTagName(nodeMin.getNodeName());
            if(!nodeMin.hasChildNodes()) {
                if (nodeMin.getTextContent() == null || nodeMin.getTextContent().isEmpty()) {
                    nodeMin.setTextContent("EXPORT_TAG_" + nodeMin.getNodeName().toUpperCase() + "_" + idx);
                    stringList.add(nodeMin.getTextContent());
                    viewModal.setTagValue(nodeMin.getTextContent());
                }
            }
            for(int i=0; i<nodeMin.getAttributes().getLength(); i++)
            {
                if(nodeMin.getAttributes().item(i).getTextContent()==null || nodeMin.getAttributes().item(i).getTextContent().isEmpty() ) {
                    nodeMin.getAttributes().item(i).setTextContent("EXPORT_ATTR_" + nodeMin.getNodeName().toUpperCase() + "_" + idx + "_" + i);
                    stringList.add(nodeMin.getAttributes().item(i).getTextContent());
                }
                if(nodeMin.hasAttributes()) {
                    viewModal.getAttributes().add(listAllAttributes(nodeMin.getAttributes().item(i)));
                }
            }
            viewModals.add(viewModal);
        }


        System.out.println("Everything replaced.");
        // save xml file INN string
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        DOMSource source = new DOMSource(doc);
        StringWriter sw = new StringWriter();
        transformer.transform(source,  new StreamResult(sw));
        String new1 = sw.toString().split("</Journal>")[1].trim().split("</GLEntry>")[0].trim();
        String new2 = sw.toString().replaceAll(new1,"EXPORT_NESTED_STRING");

        System.out.println(new1);
        System.out.println(new2);

        Map<String,List<String>> stringMap = new HashMap<>();
        stringMap.put("allConfig",stringList);
        responsePayLoad.setPayloadMain(new2);
        responsePayLoad.setMessages(stringMap);
        responsePayLoad.setListData(viewModals);
        responsePayLoad.setPayload(new1);

       return responsePayLoad;
    }


    public AttributeViewModal listAllAttributes(Node element) {

            AttributeViewModal attributeViewModal = new AttributeViewModal();
            String attrName = element.getNodeName();
            attributeViewModal.setAttributeName(attrName);
            attributeViewModal.setAttributeVal(element.getTextContent());

            return attributeViewModal;
    }




    public String convertHeaderIntoXmlfile(GenerateXmlViewModal respdata)
    {
        List<String> newXmTagsMain = new ArrayList<>();
        for(String contentString: respdata.getMainList())
        {
            if(contentString.contains("<->"))
            {
                String[] stringArray = contentString.split("<->");
                if(stringArray!=null && stringArray.length >1)
                {
                    newXmTagsMain.add(stringArray[1]);
                }
            }
        }

        String headerLevelData = respdata.getCompleteObj().getPayloadMain();
        List<String> listConfig = respdata.getCompleteObj().getMessages().get("allConfig");
        for (String totalProperties : listConfig)
        {
            String xmlString;
            if (newXmTagsMain.contains(totalProperties) && headerLevelData.contains(totalProperties))
            {
                String newXmlMianStrng = newXmTagsMain.stream().filter(first -> first.equals(totalProperties)).findAny().get();

                if (newXmlMianStrng != null && !newXmlMianStrng.isEmpty())
                {
                    xmlString = newXmlMianStrng;
                    if (xmlString.contains("DATE"))
                    {
                        headerLevelData = headerLevelData.replaceAll(xmlString, new SimpleDateFormat("dd/MM/yyyy").format(new Date()));
                    } else
                    {
                        headerLevelData = headerLevelData.replaceAll(xmlString, Strings.EMPTY);
                    }
                }
            }else
            {
                if(headerLevelData.contains(totalProperties)) {
                    headerLevelData = headerLevelData.replaceAll(totalProperties, Strings.EMPTY);
                }
            }
        }
        return headerLevelData;
    }


    public String convertNestedDataIntoXml(GenerateXmlViewModal respdata)
    {
        List<String> newXmTags = respdata.getMainList();
        List<String> newXmTagsMain = new ArrayList<>();
        for(String contentString: respdata.getMainList())
        {
            if(contentString.contains("<->"))
            {
                String[] stringArray = contentString.split("<->");
                if(stringArray!=null && stringArray.length >1)
                {
                    newXmTagsMain.add(stringArray[1]);
                }
            }
        }
        StringBuilder sb = new StringBuilder();
        List<String> listConfig = respdata.getCompleteObj().getMessages().get("allConfig");
        for(Map<String,Object> importData: respdata.getCompleteObj().getAllData())
        {
            String headerLevelData = respdata.getCompleteObj().getPayload();
            for (String totalProperties : listConfig) {
                String xmlString;
                String excelHeader;
                if (newXmTagsMain.contains(totalProperties) && headerLevelData.contains(totalProperties)) {
                    String newXmlMianStrng = newXmTags.stream().filter(first -> first.contains(totalProperties)).findAny().get();

                    if (newXmlMianStrng != null && !newXmlMianStrng.isEmpty() && newXmlMianStrng.contains("<->")) {
                        xmlString = newXmlMianStrng.split("<->")[1];
                        excelHeader = newXmlMianStrng.split("<->")[0];
                        if(importData.containsKey(excelHeader)) {

                            String excelVal= importData.get(excelHeader).toString();

                            if (headerLevelData.contains(xmlString)) {
                                headerLevelData = headerLevelData.replaceAll(xmlString, excelVal);
                            } else {
                                headerLevelData = headerLevelData.replaceAll(xmlString, Strings.EMPTY);
                            }
                        }
                    }
                }else{
                    if(headerLevelData.contains(totalProperties)) {
                        headerLevelData = headerLevelData.replaceAll(totalProperties, Strings.EMPTY);
                    }
                }

            }
            sb.append(headerLevelData);
        }
        return sb.toString();
    }



    public String mainPayLoadAfterConfig(GenerateXmlViewModal respdata){

        String mainHeader = this.convertHeaderIntoXmlfile(respdata);
        String nestedData = this.convertNestedDataIntoXml(respdata);

        if(mainHeader!=null && mainHeader.contains("EXPORT_NESTED_STRING"))
        {
            mainHeader = mainHeader.replaceAll("EXPORT_NESTED_STRING",nestedData);

        }
        return mainHeader;
    }
}
