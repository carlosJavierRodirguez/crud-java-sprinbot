package com.example.explorer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.explorer.service.MeetingService;

@RestController
@RequestMapping("/api/v1/meeting")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    // lista los datos de la tabla 
    @GetMapping("/")
    public ResponseEntity<Object> getAllMeeting() {
        var listaEnceuntros = meetingService.findAll();
        return new ResponseEntity<>(listaEnceuntros, HttpStatus.OK);
    }

}
