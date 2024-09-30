package com.tagservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Tag {
    @Id
    private Long id;
    private String tags;

    public Tag(Long id, String tags) {
        this.id = id;
        this.tags = tags;
    }

    public Tag() {

    }
}
