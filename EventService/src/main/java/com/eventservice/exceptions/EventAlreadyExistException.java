package com.eventservice.exceptions;

public class EventAlreadyExistException extends Exception {
    public EventAlreadyExistException(String message) {
        super(message);
    }
}

