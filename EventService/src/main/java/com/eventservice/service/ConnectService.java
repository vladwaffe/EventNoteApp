package com.eventservice.service;


import com.eventservice.model.tag.TagEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ConnectService {
    private final RestTemplate restTemplate;
    private final String GET_TAG_LIST = "http://tagservice:8081/tag/";
    private final String ADD_TAG_LIST = "http://tagservice:8081/tag/";


    @Autowired
    public ConnectService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public List<TagEnum> getTagList(Long id) {
        return restTemplate.exchange(
                GET_TAG_LIST + id, HttpMethod.GET, null, new ParameterizedTypeReference<List<TagEnum>>() {}).getBody();
    }
    public void addTagList(Long id, List<TagEnum> tagEnumList){
        restTemplate.postForObject(ADD_TAG_LIST + id, tagEnumList, List.class);
    }
}
