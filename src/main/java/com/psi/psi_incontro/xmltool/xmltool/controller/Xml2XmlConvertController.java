package com.psi.psi_incontro.xmltool.xmltool.controller;

/**
 * @author Srikanth v
 */


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.concurrent.Callable;

@Controller
public class Xml2XmlConvertController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public Callable<String> index( ) {
        return ()-> "index";
    }


    @RequestMapping(value = "/xmltoxml/navigate", method = RequestMethod.POST)
    public Callable<String> convertXml( ) {
        return ()-> "xml2xml";
    }
}