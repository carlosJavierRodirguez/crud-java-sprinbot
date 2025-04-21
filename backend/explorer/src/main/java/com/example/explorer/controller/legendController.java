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

import com.example.explorer.DTO.LegendDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.service.LegendService;

@RestController
@RequestMapping("/api/v1/legend")
public class legendController {

    @Autowired
    private LegendService legendService;

    // guarda los datos
    @PostMapping("/")
    public ResponseEntity<Object> registerLegend(@RequestBody LegendDTO legendDTO) {
        responseDTO respuesta = legendService.save(legendDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // lista los datos de la tabla creature
    @GetMapping("/")
    public ResponseEntity<Object> getAllLegend() {
        var listarLegend = legendService.findAll();
        return new ResponseEntity<>(listarLegend, HttpStatus.OK);
    }

    // borrar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteLegend(@PathVariable int id) {
        var message = legendService.deleteLegend(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // listar por palabra clave en el título
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getListLegendForTitle(@PathVariable String filter) {
        var listarLegend = legendService.getListLegendForTitle(filter);
        return new ResponseEntity<>(listarLegend, HttpStatus.OK);
    }
}
