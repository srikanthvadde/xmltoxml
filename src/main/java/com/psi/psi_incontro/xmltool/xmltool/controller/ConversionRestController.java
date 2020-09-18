package com.psi.psi_incontro.xmltool.xmltool.controller;

import com.psi.psi_incontro.xmltool.xmltool.services.XmlConversionService;
import com.psi.psi_incontro.xmltool.xmltool.viewmodals.GenerateXmlViewModal;
import com.psi.psi_incontro.xmltool.xmltool.viewmodals.ResponsePayloadModel;
import com.psi.psi_incontro.xmltool.xmltool.viewmodals.ResponseViewModal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author Srikanth v
 */
@RestController
@RequestMapping("/api/v1/xml2xml")
public class ConversionRestController {

    @Autowired
    XmlConversionService conversionService;



    @PostMapping("/fetch-excel-headers")
    public ResponsePayloadModel<ResponseViewModal> getListOfHeadersExcel(@RequestParam(value = "file") MultipartFile file) throws Exception
    {
        ResponsePayloadModel<ResponseViewModal> responsePayloadModel = new ResponsePayloadModel<>();
        try {

            responsePayloadModel.setResult("success");
            responsePayloadModel  = conversionService.getHeadersFromExcel(file,responsePayloadModel);
        }catch(Exception e){
            responsePayloadModel.setResult("fail");

    }
       return responsePayloadModel;
    }

    @PostMapping("/fetch-xml-headers")
    public ResponsePayloadModel<ResponseViewModal> getListOfHeadersXML(@RequestParam(value = "file") MultipartFile file) throws Exception
    {
        ResponsePayloadModel<ResponseViewModal> responsePayloadModel = new ResponsePayloadModel<>();
        try
        {
            responsePayloadModel.setResult("success");
            responsePayloadModel = conversionService.getXmlTags(file,responsePayloadModel);

        }catch(Exception e)
        {
            responsePayloadModel.setResult("fail");
            responsePayloadModel.setListData(null);
        }
        return  responsePayloadModel;
    }

    @PostMapping("/convert-into-xml-file")
    public ResponseEntity<byte[]>  convertGenerateXmlFile(@RequestBody GenerateXmlViewModal reponsedata) throws Exception
    {
        if(reponsedata!=null) {
             String finalString =  conversionService.mainPayLoadAfterConfig(reponsedata);
            byte[] isr = finalString.getBytes();
            return new ResponseEntity<>(isr, null, HttpStatus.OK);
        }
        return null;
    }



}
