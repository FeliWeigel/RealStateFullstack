package com.fsrstateaws.backend.service;

import com.fsrstateaws.backend.entities.EmailRequest;
import com.fsrstateaws.backend.entities.OperationRegister;
import com.fsrstateaws.backend.entities.OperationType;
import com.fsrstateaws.backend.entities.Property;
import com.fsrstateaws.backend.exceptions.NullFieldsException;
import com.fsrstateaws.backend.repository.OperationRepository;
import com.fsrstateaws.backend.repository.PropertyRepository;
import com.fsrstateaws.backend.security.jwt.JwtService;
import com.fsrstateaws.backend.security.jwt.Token;
import com.fsrstateaws.backend.security.jwt.TokenRepository;
import com.fsrstateaws.backend.user.User;
import com.fsrstateaws.backend.user.UserRepository;
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

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OperationService {

    @Value("${spring.mail.username}")
    private String email;
    
    private final JavaMailSender sender;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final OperationRepository operationRepository;

    public ResponseEntity<Object> registerOperation(EmailRequest emailRequest, Long propertyId, String userToken) throws MessagingException {
        if(emailRequest.getTo() == null){
            return new ResponseEntity<>(new NullFieldsException("Warning! Fields cannot be null."), HttpStatus.BAD_REQUEST);
        }
        if(!validateUserToken(userToken)){
            new ResponseEntity<>(new RuntimeException("User or token not found."), HttpStatus.NOT_FOUND);
        }
        String username = jwtService.extractUsername(userToken);
        var user = userRepository.findByEmail(username);

        Property propertySaved = propertyRepository.findById(propertyId).orElse(null);
        if (propertySaved == null) {
            return new ResponseEntity<>(new RuntimeException("Property not found."), HttpStatus.NOT_FOUND);
        }

        OperationRegister newUserOperation = OperationRegister.builder()
                .userId(user.get().getId())
                .userFirstname(user.get().getFirstname())
                .userLastname(user.get().getLastname())
                .userEmail(user.get().getEmail())
                .propertyId(propertySaved.getPropertyId())
                .propertyName(propertySaved.getName())
                .description(emailRequest.getText())
                .build();

        if(propertySaved.getOnSale()){
            newUserOperation.setType(OperationType.BUY);
        }else {
            newUserOperation.setType(OperationType.RENT);
        }

        operationRepository.save(newUserOperation);

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(email);
        helper.setTo(emailRequest.getTo());
        helper.setSubject("Buy/Rent request in Real state");
        helper.setText("Hi "+ user.get().getFirstname() +"! We contacted of Real State to begin the process of selling/renting a property.\n" +
                "Reply to this email, and a seller will contact you shortly.\n" +
                "Att: Real State.");
        sender.send(message);

        return new ResponseEntity<>("We have sent a message to your email box.", HttpStatus.OK);
    }

    public List<OperationRegister> getAllOperationRegisters(){
        return operationRepository.findAll();
    }

    public void deleteAllRegisters(){
        operationRepository.deleteAll();
    }

    private Boolean validateUserToken(String userToken){
        if(userToken == null){
            return false;
        }
        String username = jwtService.extractUsername(userToken);
        User user = userRepository.findByEmail(username).orElse(null);
        Token tokenSaved = tokenRepository.findByToken(userToken).orElse(null);

        if (user == null || tokenSaved == null) {
            return false;
        }

        List<Token> allUserTokens = tokenRepository.allValidTokensByUser(user.getId());
        if(!allUserTokens.contains(tokenSaved)){
            return false;
        }

        return true;
    }
}
