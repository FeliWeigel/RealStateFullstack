package com.fsrstateaws.backend.user;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class UserDTO {

    private String firstname;
    private String lastname;
    private String email;
    private Date birthdate;
    private Role role;
}
