package com.psi.psi_incontro.xmltool.xmltool;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;
import java.io.File;

/**
 * @author Srikanth v
 */
public class Sample {


    public static void main(String argv[]) throws Exception {

        String filepath = "D:/Project/xmltemplate.xml";
        String fileToBeSaved = "D:/Project/xmltemplate1.xml";;

       /* DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
        Document doc = docBuilder.parse(filepath);

        XPath xpath = XPathFactory.newInstance().newXPath();
        // change ELEMENTS



        NodeList nodesMain = doc.getElementsByTagName("*");
        int nodelENGHT =nodesMain.getLength();

        for (int idx = 0; idx < nodelENGHT; idx++) {
            Node nodemmin = nodesMain.item(idx);
            if(!nodemmin.hasChildNodes())
            {
                nodemmin.setTextContent("EXPORT_TAG_"+nodemmin.getNodeName().toUpperCase()+"_"+idx);
            }
            //

            for(int i=0; i<nodemmin.getAttributes().getLength(); i++) {
                nodemmin.getAttributes().item(i).setTextContent("EXPORT_ATTR_"+nodemmin.getNodeName().toUpperCase()+"_"+idx+"_"+i);
            }
        }

        System.out.println("Everything replaced.");
        // save xml file back
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        DOMSource source = new DOMSource(doc);
        StreamResult result = new StreamResult(new File(fileToBeSaved));
        transformer.transform(source, result);*/
    }



}
