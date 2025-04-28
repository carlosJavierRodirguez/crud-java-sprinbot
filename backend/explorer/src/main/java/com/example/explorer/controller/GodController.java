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

import com.example.explorer.DTO.GodDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.service.GodService;

@RestController
@RequestMapping("/api/v1/god")
public class GodController {

    @Autowired
    private GodService godService;

    // guardar datos
    @PostMapping("/")
    public ResponseEntity<Object> registerGod(@RequestBody GodDTO godDTO) {
        responseDTO respuesta = godService.save(godDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // lista los datos de la tabla god
    @GetMapping("/")
    public ResponseEntity<Object> getAllGod() {
        var listaDioses = godService.findAll();
        return new ResponseEntity<>(listaDioses, HttpStatus.OK);
    }

    // filtrar por palabra clave en el nombre
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getListGodForName(@PathVariable String filter) {
        var listaDioses = godService.getListGodForName(filter);
        return new ResponseEntity<>(listaDioses, HttpStatus.OK);
    }

    // borrar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGod(@PathVariable int id) {
        var message = godService.deleteGod(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
