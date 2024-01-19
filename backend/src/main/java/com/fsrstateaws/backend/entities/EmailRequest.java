package com.fsrstateaws.backend.entities;

import lombok.Data;

@Data
public class EmailRequest {

    private String to;
    private String text;

}
