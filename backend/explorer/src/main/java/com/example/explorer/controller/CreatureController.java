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

import com.example.explorer.DTO.CreatureDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.service.CreatureService;

@RestController
@RequestMapping("/api/v1/creature")
public class CreatureController {
    @Autowired
    private CreatureService creatureService;

    // guardar datos
    @PostMapping("/")
    public ResponseEntity<Object> registerCreature(@RequestBody CreatureDTO creatureDTO) {
        responseDTO respuesta = creatureService.save(creatureDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // lista los datos de la tabla creature
    @GetMapping("/")
    public ResponseEntity<Object> getAllCreatures() {
        var listaCreaturas = creatureService.findAll();
        return new ResponseEntity<>(listaCreaturas, HttpStatus.OK);
    }

    // filtrar por palabra clave en el nombre
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getListCreatureForName(@PathVariable String filter) {
        var listaCreaturas = creatureService.getListCreatureForName(filter);
        return new ResponseEntity<>(listaCreaturas, HttpStatus.OK);
    }

    // borrar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCreature(@PathVariable int id) {
        var message = creatureService.deleteCreature(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
