package com.fsrstateaws.backend.security.auth;

import com.fsrstateaws.backend.exceptions.BusyCredentialsException;
import com.fsrstateaws.backend.exceptions.InvalidPasswordException;
import com.fsrstateaws.backend.exceptions.InvalidTokenException;
import com.fsrstateaws.backend.exceptions.NullFieldsException;
import com.fsrstateaws.backend.security.jwt.JwtService;
import com.fsrstateaws.backend.security.jwt.Token;
import com.fsrstateaws.backend.security.jwt.TokenRepository;
import com.fsrstateaws.backend.user.Role;
import com.fsrstateaws.backend.user.UpdatePasswordRequest;
import com.fsrstateaws.backend.user.User;
import com.fsrstateaws.backend.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${spring.mail.username}")
    private String email;

    private final JavaMailSender sender;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    private void saveUserToken(User user, String token){
        var saveToken = Token.builder()
                .token(token)
                .user(user)
                .revoked(false)
                .expired(false)
                .build();

        tokenRepository.save(saveToken);
    }

    private void revokeAllUserTokens(User user){
        var validTokens = tokenRepository.allValidTokensByUser(user.getId());

        if(validTokens.isEmpty()){
            return;
        }

        validTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });

        tokenRepository.saveAll(validTokens);
    }

    private Boolean isValidPassword(String password){
        boolean isCLetter = false, isNumber = false, isSpecialChar = false;
        Pattern specialsList = Pattern.compile ("[?!¡@¿.,´)]");
        Matcher hasSpecial = specialsList.matcher(password);
        char[] passwordArr = password.toCharArray();

        if(!password.isBlank() && password.length() >= 6){
            for(char i : passwordArr){
                if(Character.isUpperCase(i)){
                    isCLetter = true;
                }else if(Character.isDigit(i)){
                    isNumber = true;
                }else if(hasSpecial.find()){
                    isSpecialChar = true;
                }
            }

        }else{
            return false;
        }

        return isCLetter && isNumber && isSpecialChar;
    }

    public ResponseEntity<Object> Register(RegisterRequest registerRequest){
        if(registerRequest.getFirstname().isBlank()|| registerRequest.getLastname().isBlank() ||
                registerRequest.getEmail().isBlank() || registerRequest.getPassword().isBlank() ||
                    registerRequest.getRepeatPassword().isBlank() || registerRequest.getBirthdate() == null){
            return new ResponseEntity<>(new NullFieldsException("Warning! Fields cannot be null. Please, complete all credentials."), HttpStatus.BAD_REQUEST);
        }else if(userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            return new ResponseEntity<>(new BusyCredentialsException("The email is associated with an existing account. Please try again."), HttpStatus.CONFLICT);
        }else if(registerRequest.getPassword().length() < 6){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The password must contain six digits or more."), HttpStatus.BAD_REQUEST);
        }else if(!isValidPassword(registerRequest.getPassword())){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The password must contain a capital letter, symbol and number."), HttpStatus.BAD_REQUEST);
        }else if(!registerRequest.getPassword().equals(registerRequest.getRepeatPassword())){
            return new ResponseEntity<>(new InvalidPasswordException("Error! Passwords must much."), HttpStatus.BAD_REQUEST);
        }
        var user = User.builder()
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .email(registerRequest.getEmail())
                .birthdate(registerRequest.getBirthdate())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.ADMIN)
                .build();

        if(registerRequest.getEmail().contains("adminV1") && registerRequest.getPassword().length() > 15){
            user.setRole(Role.ADMIN);
        }else {
            user.setRole(Role.USER);
        }

        var savedUser = userRepository.save(user);
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(savedUser, accessToken);

        return new ResponseEntity<>(
                AuthResponse.builder()
                .access_token(accessToken)
                .refresh_token(refreshToken)
                .build(),
                HttpStatus.OK);
    }

    public ResponseEntity<AuthResponse> login(AuthRequest authRequest){
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
            )
        );

        var user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow();
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        return new ResponseEntity<>(
                AuthResponse.builder()
                        .access_token(accessToken)
                        .refresh_token(refreshToken)
                        .build(),
                HttpStatus.OK
        );

    }

    public ResponseEntity<Object> updatePassword(String token, UpdatePasswordRequest request){
        Token tokenSaved = tokenRepository.findByToken(token).orElse(null);
        if(tokenSaved == null){
            throw new InvalidTokenException("Token not found.");
        }

        String userEmail = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if(user == null || userEmail == null){
            throw new UsernameNotFoundException("User " + userEmail + " not found.");
        }

        List<Token> userTokens = tokenRepository.allValidTokensByUser(user.getId());
        if(!userTokens.contains(tokenSaved)){
            throw new InvalidTokenException("Token invalid for user: " + userEmail);
        } else if(request.getOldPassword().isBlank() || request.getNewPassword().isBlank()
                || request.getConfirmNewPassword().isBlank()) {

            return new ResponseEntity<>(new NullFieldsException("Error! The fields cannot be null. Please try again"), HttpStatus.BAD_REQUEST);
        } else if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The old password sent is incorrect."), HttpStatus.BAD_REQUEST);
        } else if(!request.getNewPassword().equals(request.getConfirmNewPassword())){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The passwords must match."), HttpStatus.BAD_REQUEST);
        } else if(!isValidPassword(request.getNewPassword())){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The password must contain a capital letter, symbol and number."), HttpStatus.BAD_REQUEST);
        } else if(request.getNewPassword().length() < 6){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The password must contain six digits or more."), HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return new ResponseEntity<>("Your password has been updated correctly!", HttpStatus.OK);
    }

    public ResponseEntity<Object> sendEmailForRecover(String userEmail) throws MessagingException {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if(user == null){
            return new ResponseEntity<>(new UsernameNotFoundException("The provided email does not belong to an existing account"), HttpStatus.NOT_FOUND);
        }

        String recoverToken = jwtService.generateToken(user);
        String urlToken = Base64.getUrlEncoder().encodeToString(recoverToken.getBytes(StandardCharsets.UTF_8));

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(email);
        helper.setTo(userEmail);
        helper.setSubject("Forgot you password?");
        helper.setText("Hi, " + user.getFirstname() + "! We have received your request to change your password. Click on the link below to access the system. If it wasn't you, please dismiss this email and contact the support team soon. \n" +
                "Best regards. \n"  +
                "Real State. \n" +
                "\n" +
                "Link: http://localhost:5173/user/recover/recover_pass/" + urlToken
        );

        sender.send(message);
        return new ResponseEntity<>("We have sent a request for update to your email box.", HttpStatus.OK);
    }

    public ResponseEntity<Object> recoverPassword(String recoverToken, UpdatePasswordRequest request){
        if(recoverToken.isBlank()){
            throw new InvalidTokenException("Invalid token!");
        }
        String decodedToken = new String(Base64.getUrlDecoder().decode(recoverToken), StandardCharsets.UTF_8);
        if(jwtService.isTokenExpired(decodedToken)){
            throw new InvalidTokenException("Token expired!");
        }
        if(request.getNewPassword().isBlank() || request.getConfirmNewPassword().isBlank()){
            return new ResponseEntity<>(new NullFieldsException("Error! The fields cannot be null. Please try again"), HttpStatus.BAD_REQUEST);
        }

        String userEmail = jwtService.extractUsername(decodedToken);
        User user = userRepository.findByEmail(userEmail).orElse(null);

        if(userEmail.isBlank() || user == null){
            throw new UsernameNotFoundException("User not found.");
        }

        if(!request.getNewPassword().equals(request.getConfirmNewPassword())){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The passwords must match."), HttpStatus.BAD_REQUEST);
        } else if(!isValidPassword(request.getNewPassword())){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The password must contain a capital letter, symbol and number."), HttpStatus.BAD_REQUEST);
        } else if(request.getNewPassword().length() < 6){
            return new ResponseEntity<>(new InvalidPasswordException("Error! The password must contain six digits or more."), HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return new ResponseEntity<>("Your password has been updated correctly!", HttpStatus.OK);
    }
}
