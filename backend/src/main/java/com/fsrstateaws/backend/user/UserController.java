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

    @PostMapping("/update/pass")
    public ResponseEntity<Object> updateUserPassword(@RequestHeader(name = "Authorization") String authHeader,
                                                     @RequestBody UpdatePasswordRequest request){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(authService.updatePassword(userToken, request), HttpStatus.OK);
    }

    @PostMapping("/update/request")
    public ResponseEntity<Object> sendRequestForRecover(@RequestParam String email) throws MessagingException {
        return new ResponseEntity<>(authService.sendEmailForRecover(email), HttpStatus.OK);
    }

    @PostMapping("/update/recover_pass")
    public ResponseEntity<Object> recoverUserPassword(@RequestParam String token, @RequestBody UpdatePasswordRequest request){
        return new ResponseEntity<>(authService.recoverPassword(token, request), HttpStatus.OK);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
