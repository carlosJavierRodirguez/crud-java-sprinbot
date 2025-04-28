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

import com.example.explorer.DTO.ArtifactsDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Artifacts;
import com.example.explorer.service.ArtifactsService;

@RestController
@RequestMapping("/api/v1/artifacts")
public class ArtefactsController {

    @Autowired
    private ArtifactsService artifactsService;

    // Guardar o actualizar un artefacto
    @PostMapping("/")
    public ResponseEntity<Object> registerArtifact(@RequestBody ArtifactsDTO artifactsDTO) {
        responseDTO respuesta = artifactsService.save(artifactsDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // Listar todos los artefactos activos
    @GetMapping("/")
    public ResponseEntity<Object> getAllArtifacts() {
        List<Artifacts> listaArtefactos = artifactsService.findAll();
        return new ResponseEntity<>(listaArtefactos, HttpStatus.OK);
    }

    // Filtrar artefactos por nombre
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getArtifactsByName(@PathVariable String filter) {
        List<Artifacts> listaFiltrada = artifactsService.getListArtifactsForName(filter);
        return new ResponseEntity<>(listaFiltrada, HttpStatus.OK);
    }

    // Eliminar un artefacto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteArtifact(@PathVariable int id) {
        responseDTO respuesta = artifactsService.deleteArtefact(id);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

}
