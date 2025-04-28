package com.example.explorer.controller;

import java.util.List;

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

import com.example.explorer.DTO.MysticLocationDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.MysticLocation;
import com.example.explorer.service.MysticLocationService;

@RestController
@RequestMapping("/api/v1/mysticLocation")
public class MysticLocationController {
    @Autowired
    private MysticLocationService mysticLocationService;

    // Guardar o actualizar un artefacto
    @PostMapping("/")
    public ResponseEntity<Object> registerArtifact(@RequestBody MysticLocationDTO mysticLocationDTO) {
        responseDTO respuesta = mysticLocationService.save(mysticLocationDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // Listar todos los artefactos activos
    @GetMapping("/")
    public ResponseEntity<Object> getAllMysticLocation() {
        List<MysticLocation> listaLocalitation = mysticLocationService.findAll();
        return new ResponseEntity<>(listaLocalitation, HttpStatus.OK);
    }

    // Filtrar artefactos por nombre
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getListMysticLocationForName(@PathVariable String filter) {
        List<MysticLocation> listaFiltrada = mysticLocationService.getListMysticLocationForName(filter);
        return new ResponseEntity<>(listaFiltrada, HttpStatus.OK);
    }

    // Eliminar un artefacto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteArtifact(@PathVariable int id) {
        responseDTO respuesta = mysticLocationService.deleteMysticLocation(id);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
