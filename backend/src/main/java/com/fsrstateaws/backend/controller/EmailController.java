package com.fsrstateaws.backend.controller;

import com.fsrstateaws.backend.entities.EmailRequest;
import com.fsrstateaws.backend.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/email")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Object> sendEmail(@RequestBody EmailRequest emailRequest) throws MessagingException {
        return emailService.sendMail(emailRequest);
    }
}
