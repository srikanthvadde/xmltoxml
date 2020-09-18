package com.psi.psi_incontro.xmltool.xmltool.viewmodals;

import java.util.List;

/**
 * @author Srikanth v
 */
public class GenerateXmlViewModal {

    private List<String> mainList;
    private ResponsePayloadModel<ResponseViewModal> completeObj;

    public List<String> getMainList() {
        return mainList;
    }

    public void setMainList(List<String> mainList) {
        this.mainList = mainList;
    }

    public ResponsePayloadModel<ResponseViewModal> getCompleteObj() {
        return completeObj;
    }

    public void setCompleteObj(ResponsePayloadModel<ResponseViewModal> completeObj) {
        this.completeObj = completeObj;
    }
}
