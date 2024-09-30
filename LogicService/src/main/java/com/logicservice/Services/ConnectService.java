package com.logicservice.Services;

import com.logicservice.model.eventDTO.EventDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@Service
public class ConnectService {
    private final RestTemplate restTemplate;
    private final String GET_EVENT_LIST = "http://eventservice:8080/event";


    @Autowired
    public ConnectService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public List<EventDTO> getEventList(){
            return restTemplate.exchange(
                    GET_EVENT_LIST, HttpMethod.GET, null, new ParameterizedTypeReference<List<EventDTO>>() {}).getBody();
    }


}
