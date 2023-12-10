package com.fsrstateaws.backend.security.auth;

import com.fsrstateaws.backend.exceptions.BusyCredentialsException;
import com.fsrstateaws.backend.exceptions.InvalidPasswordException;
import com.fsrstateaws.backend.exceptions.NullFieldsException;
import com.fsrstateaws.backend.security.jwt.JwtService;
import com.fsrstateaws.backend.security.jwt.Token;
import com.fsrstateaws.backend.security.jwt.TokenRepository;
import com.fsrstateaws.backend.user.Role;
import com.fsrstateaws.backend.user.User;
import com.fsrstateaws.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

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
                .role(Role.USER)
                .build();

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

}
