package com.fsrstateaws.backend.exceptions;

public class BusyCredentialsException extends RuntimeException{
    public BusyCredentialsException(String message){
        super(message);
    }
}
