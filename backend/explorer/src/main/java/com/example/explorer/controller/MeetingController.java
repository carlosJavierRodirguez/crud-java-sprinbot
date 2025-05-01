package com.example.explorer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.explorer.DTO.MeetingDTO;
import com.example.explorer.DTO.responseDTO;
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

    // guardar datos
    @PostMapping("/")
    public ResponseEntity<Object> registerMeeting(@RequestBody MeetingDTO meetingDTO) {
        responseDTO respuesta = meetingService.save(meetingDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // filtrar por palabra clave en el nombre
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> filterForNameExplorer(@PathVariable String filter) {
        var lista = meetingService.filterForNameExplorer(filter);
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    // borrar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMeeting(@PathVariable int id) {
        var message = meetingService.deleteMeeting(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
