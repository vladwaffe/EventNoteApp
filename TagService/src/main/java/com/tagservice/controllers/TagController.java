package com.tagservice.controllers;


import com.tagservice.model.TagEnum;
import com.tagservice.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {
    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<TagEnum>> sendList(@PathVariable Long id) {
        return ResponseEntity.ok(tagService.getTagsById(id));
    }
    @PostMapping("/{id}")
    public void addList(@PathVariable Long id, @RequestBody List<TagEnum> tagEnumList){
        tagService.saveTag(id, tagEnumList);
    }
}
