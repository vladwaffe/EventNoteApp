package com.eventservice.controller;


import com.eventservice.model.event.DTO.EventDTO;
import com.eventservice.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/all")
public class EventsController {

    private final EventService eventService;

    @Autowired
    public EventsController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    @Operation(summary = "Получение всех событий")
    public ResponseEntity<List<EventDTO>> findAll() {
        List<EventDTO> events = eventService.findAll();
        return ResponseEntity.ok(events);
    }
}
