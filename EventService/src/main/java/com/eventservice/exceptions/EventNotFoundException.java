package com.eventservice.exceptions;

public class EventNotFoundException extends Exception {
    public EventNotFoundException(String message) {
        super(message);
    }
}
