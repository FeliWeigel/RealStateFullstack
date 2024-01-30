package com.fsrstateaws.backend.security.config;

import com.fsrstateaws.backend.security.jwt.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String header = request.getHeader("Authorization");
        String token;

        if(header == null || !header.startsWith("Bearer ")){
            return;
        }

        token = header.substring(7);
        var tokenSaved = tokenRepository.findByToken(token).orElse(null);
        if(tokenSaved != null){
            tokenSaved.setExpired(true);
            tokenSaved.setRevoked(true);
            tokenRepository.save(tokenSaved);
            SecurityContextHolder.clearContext();
        }
    }
}

