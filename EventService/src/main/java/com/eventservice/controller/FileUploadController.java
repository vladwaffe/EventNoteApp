package com.eventservice.controller;

import com.eventservice.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
public class FileUploadController {

    @Autowired
    private ImageService imageService;

    public FileUploadController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }


    @PostMapping("/createAd")
    public void createAd(@RequestParam("image") MultipartFile image) throws IOException {
        String uploadDirectory = "src/main/resources/static/image";

        String str = imageService.saveImageToStorage(uploadDirectory, image);
        System.out.println(str);
    }

    @Autowired
    private final ResourceLoader resourceLoader;

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        System.out.println(filename);
        Resource resource = resourceLoader.getResource("file:" + "src/main/resources/static/image" + "/" + filename);
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



}

