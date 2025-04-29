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

import com.example.explorer.DTO.AncientLanguageDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.AncientLanguage;
import com.example.explorer.service.AncientLanguageService;

@RestController
@RequestMapping("/api/v1/languages")
public class AncientLanguageController {

    @Autowired
    private AncientLanguageService ancientLanguageService;

    // Guardar o actualizar un lenguaje antiguo
    @PostMapping("/")
    public ResponseEntity<Object> registerLanguage(@RequestBody AncientLanguageDTO ancientLanguageDTO) {
        responseDTO respuesta = ancientLanguageService.save(ancientLanguageDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // Listar todos los lenguajes
    @GetMapping("/")
    public ResponseEntity<Object> getAllLanguages() {
        List<AncientLanguage> listaLenguajes = ancientLanguageService.findAll();
        return new ResponseEntity<>(listaLenguajes, HttpStatus.OK);
    }

    // Filtrar lenguajes por nombre
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getLanguagesByName(@PathVariable String filter) {
        List<AncientLanguage> listaFiltrada = ancientLanguageService.findByName(filter);
        return new ResponseEntity<>(listaFiltrada, HttpStatus.OK);
    }

    // Eliminar un lenguaje por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteLanguage(@PathVariable int id) {
        responseDTO respuesta = ancientLanguageService.delete(id);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

}
