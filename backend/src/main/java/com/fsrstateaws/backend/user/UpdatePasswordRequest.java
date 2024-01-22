package com.fsrstateaws.backend.user;

import lombok.Builder;
import lombok.Data;

@Data
public class UpdatePasswordRequest {

    private String oldPassword;
    private String newPassword;
    private String confirmNewPassword;
}
