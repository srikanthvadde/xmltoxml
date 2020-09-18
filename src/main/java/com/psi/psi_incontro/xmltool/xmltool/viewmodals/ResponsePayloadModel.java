package com.psi.psi_incontro.xmltool.xmltool.viewmodals;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * THIS MODEL IS THE STANDARD RESPONSE FROM FORM API REQUESTS
 * T = FORM VIEW MODEL OR SET TO OBJECT IF NO VIEW MODEL
 * @param <T>
 */

public class ResponsePayloadModel<T> implements Serializable
{

    private static final long serialVersionUID = 1L;
    private T data;
    private String reference;
    private String result;
    private String action;
    private String payload;
    private String payloadMain;
    private Map<String, List<String>> messages;
    private Map<String, List<String>> errors;
    private int count;
    private List<T>listData = new ArrayList<>();
    private List<Map<String,Object>> allData = new ArrayList<>();


    public ResponsePayloadModel()
    {
        this.messages = new HashMap<>();
        this.errors = new HashMap<>();
        this.errors.put("generalErrors", new ArrayList<>());
    }

    public ResponsePayloadModel(T data,
                                String reference,
                                String result,
                                String action,
                                String payload,
                                String payloadMain,
                                Map<String, List<String>> messages,
                                Map<String, List<String>> errors,int count,List<T>listData,  List<Map<String,Object>> allData)
    {
        this.data = data;
        this.reference = reference;
        this.result = result;
        this.action = action;
        this.payload = payload;
        this.payloadMain = payloadMain;
        this.messages = messages;
        this.errors = errors;
        this.count=count;
        this.listData=listData;
        this.allData = allData;

    }

    public T getData()
    {
        return data;
    }

    public void setData(T data)
    {
        this.data = data;
    }

    public String getReference()
    {
        return reference;
    }

    public void setReference(String reference)
    {
        this.reference = reference;
    }

    public String getResult()
    {
        return result;
    }

    public void setResult(String result)
    {
        this.result = result;
    }

    public String getAction()
    {
        return action;
    }

    public void setAction(String action)
    {
        this.action = action;
    }

    public String getPayload()
    {
        return payload;
    }

    public void setPayload(String payload)
    {
        this.payload = payload;
    }

    public Map<String, List<String>> getMessages()
    {
        return messages;
    }

    public void setMessages(Map<String, List<String>> messages)
    {
        this.messages = messages;
    }

    public Map<String, List<String>> getErrors()
    {
        return errors;
    }

    public void setErrors(Map<String, List<String>> errors)
    {
        this.errors = errors;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<T> getListData() {
        return listData;
    }

    public void setListData(List<T> listData) {
        this.listData = listData;
    }


    public List<Map<String, Object>> getAllData() {
        return allData;
    }

    public void setAllData(List<Map<String, Object>> allData) {
        this.allData = allData;
    }

    public String getPayloadMain() {
        return payloadMain;
    }

    public void setPayloadMain(String payloadMain) {
        this.payloadMain = payloadMain;
    }
}