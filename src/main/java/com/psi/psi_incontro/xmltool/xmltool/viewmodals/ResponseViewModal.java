package com.psi.psi_incontro.xmltool.xmltool.viewmodals;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Srikanth v
 */
public class ResponseViewModal {

    private String tagName;
    private String tagValue;

    private List<AttributeViewModal> attributes = new ArrayList<>();




    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getTagValue() {
        return tagValue;
    }

    public void setTagValue(String tagValue) {
        this.tagValue = tagValue;
    }

    public List<AttributeViewModal> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<AttributeViewModal> attributes) {
        this.attributes = attributes;
    }
}
