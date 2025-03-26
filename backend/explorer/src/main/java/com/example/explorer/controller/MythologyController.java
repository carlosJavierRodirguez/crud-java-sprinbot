package com.example.explorer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.explorer.DTO.MythologyDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.service.MythologyService;

@RestController
@RequestMapping("/api/v1/mythology")
public class MythologyController {
    @Autowired
    private MythologyService mythologyService;

    // guarda los datos
    @PostMapping("/")
    public ResponseEntity<Object> registerMythology(@RequestBody MythologyDTO mythologyDTO) {
        responseDTO respuesta = mythologyService.save(mythologyDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // listar mitologias
    @GetMapping("/")
    public ResponseEntity<Object> getAllUser() {
        var listaUsuario = mythologyService.findAll();
        return new ResponseEntity<>(listaUsuario, HttpStatus.OK);
    }

}
