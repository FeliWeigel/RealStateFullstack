package com.fsrstateaws.backend.user;

import com.fsrstateaws.backend.security.jwt.JwtService;
import com.fsrstateaws.backend.security.jwt.Token;
import com.fsrstateaws.backend.security.jwt.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;

    public UserDTO getUserDetails(String token){
        Token tokenSaved = tokenRepository.findByToken(token).orElse(null);

        if(tokenSaved == null){
            throw new RuntimeException("Invalid token!");
        }

        String username = jwtService.extractUsername(token);
        if(username != null){
            User user = userRepository.findByEmail(username).orElse(null);

            if (user != null) {
                return UserDTO.builder()
                        .firstname(user.getFirstname())
                        .lastname(user.getLastname())
                        .email(user.getEmail())
                        .birthdate(user.getBirthdate())
                        .role(user.getRole())
                        .build();
            }

            throw new UsernameNotFoundException("User with username: " + username + " not found.");
        }

        throw new UsernameNotFoundException("Username not found");
    }
}
