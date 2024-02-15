package com.fsrstateaws.backend.user;

import com.fsrstateaws.backend.security.auth.AuthService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @GetMapping("/user_details")
    public ResponseEntity<UserDTO> getAllUserDetails(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(userService.getUserDetails(userToken), HttpStatus.OK);
    }

    @PostMapping("/update/email")
    public ResponseEntity<Object> updateUserPassword(@RequestHeader(name = "Authorization") String authHeader,
                                                     @RequestBody UpdateEmailRequest request){
        String userToken = extractToken(authHeader);
        return authService.updateEmail(userToken, request);
    }

    @PostMapping("/update/pass")
    public ResponseEntity<Object> updateUserPassword(@RequestHeader(name = "Authorization") String authHeader,
                                                     @RequestBody UpdatePasswordRequest request){
        String userToken = extractToken(authHeader);
        return authService.updatePassword(userToken, request);
    }

    @PostMapping("/update/request")
    public ResponseEntity<Object> sendRequestForRecover(@RequestParam String email) throws MessagingException {
        return authService.sendEmailForRecover(email);
    }

    @PostMapping("/update/recover_pass")
    public ResponseEntity<Object> recoverUserPassword(@RequestParam String token, @RequestBody UpdatePasswordRequest request){
        return authService.recoverPassword(token, request);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
