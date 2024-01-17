package com.fsrstateaws.backend.entities;

import lombok.Data;

@Data
public class EmailRequest {

    private String to;
    private String subject;
    private String body;

}
