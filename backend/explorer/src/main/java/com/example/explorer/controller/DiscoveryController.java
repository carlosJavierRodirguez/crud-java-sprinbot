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

import com.example.explorer.DTO.DiscoveryDTO;
import com.example.explorer.model.Discovery;
import com.example.explorer.service.DiscoveryService;

@RestController
@RequestMapping("/api/v1/discovery")
public class DiscoveryController {

    @Autowired
    private DiscoveryService discoveryService;

    // guardar datos
    @PostMapping("/")
    public ResponseEntity<Object> registerDiscovery(@RequestBody DiscoveryDTO discoveryDTO) {
        var respuesta = discoveryService.save(discoveryDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // lista los datos de la tabla discovery
    @GetMapping("/")
    public ResponseEntity<Object> getAllDiscoveries() {
        List<Discovery> listaDescubrimientos = discoveryService.findAll();
        return new ResponseEntity<>(listaDescubrimientos, HttpStatus.OK);
    }

    // filtrar por palabra clave en el nombre del explorador
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getListDiscoveryForExplorerName(@PathVariable String filter) {
        List<Discovery> listaDescubrimientos = discoveryService.getListDiscoveryForExplorerName(filter);
        return new ResponseEntity<>(listaDescubrimientos, HttpStatus.OK);
    }

    // borrar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteDiscovery(@PathVariable int id) {
        var message = discoveryService.deleteDiscovery(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}