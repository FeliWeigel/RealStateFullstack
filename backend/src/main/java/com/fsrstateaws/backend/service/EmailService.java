package com.fsrstateaws.backend.service;

import com.fsrstateaws.backend.entities.EmailRequest;
import com.fsrstateaws.backend.exceptions.NullFieldsException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class EmailService {

    @Value("${spring.mail.username}")
    private String email;

    private final JavaMailSender sender;

    public ResponseEntity<Object> sendMail(EmailRequest emailRequest) throws MessagingException {
        if(emailRequest.getTo() == null || emailRequest.getSubject() == null
                || emailRequest.getBody() == null){
            return new ResponseEntity<>(new NullFieldsException("Warning! Fields cannot be null."), HttpStatus.BAD_REQUEST);
        }

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(email);
        helper.setTo(emailRequest.getTo());
        helper.setSubject(emailRequest.getSubject());
        helper.setText(emailRequest.getBody());
        sender.send(message);

        return new ResponseEntity<>("Mensaje enviado correctamente! Será contactado a la brevedad.", HttpStatus.OK);
    }
}
