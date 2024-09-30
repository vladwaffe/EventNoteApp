package com.logicservice.model.eventDTO;

import com.logicservice.model.tag.TagEnum;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private int maxPeopleCanTakePart;
    private Timestamp startTime;
    private Timestamp endTime;
    private List<TagEnum> tags;

}
