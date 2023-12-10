package com.fsrstateaws.backend.exceptions;

public class NullFieldsException extends RuntimeException{
    public NullFieldsException(String message){
        super(message);
    }
}
