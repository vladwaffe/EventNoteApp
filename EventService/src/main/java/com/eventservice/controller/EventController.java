package com.eventservice.controller;



import com.eventservice.model.event.DTO.EventDTO;
import com.eventservice.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@Tag(name = "Events", description = "Взаимодействие с событиями")
public class EventController {


    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/add")
    @Operation(summary = "Создание события", description = "Позволяет создать новое событие")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
            EventDTO savedEvent = eventService.saveEvent(eventDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }


    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Метод удаления события")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
            eventService.deleteById(id);
            return ResponseEntity.noContent().build();
    }


    @PutMapping("/edit")
    @Operation(summary = "Сохранение изменений данных о событии")
    public ResponseEntity<EventDTO> updateEvent(@RequestBody EventDTO eventDTO) {
        EventDTO updatedEvent = eventService.updateEvent(eventDTO);
            return ResponseEntity.ok(updatedEvent);
    }

    @Operation(summary = "Поиск события по ID", description = "Позволяет найти событие введя его ID")
    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> findEventById(@PathVariable Long id) {
            EventDTO eventDTO = eventService.findById(id);
            if (eventDTO != null) {
                return ResponseEntity.ok(eventDTO);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
    }




    @PostMapping("/find-by-title")
    @Operation(summary = "Поиск события по названию", description = "Позволяет найти событие введя его название")
    public ResponseEntity<List<EventDTO>> findEventByTitle(@RequestBody String title) {
            List<EventDTO> events = eventService.findByTitle(title);
            return ResponseEntity.ok(events);

    }

}




