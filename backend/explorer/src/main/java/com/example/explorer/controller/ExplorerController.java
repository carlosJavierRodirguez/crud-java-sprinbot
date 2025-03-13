package com.example.explorer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.explorer.DTO.ExplorerDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.service.ExplorerService;

@RestController
@RequestMapping("/api/v1/explorer")
public class ExplorerController {
    /*
     * GET
     * POST(REGISTER)
     * PUT
     * DELETE
     */
    @Autowired
    private ExplorerService explorerService;

    // guarda los datos
    @PostMapping("/")
    public ResponseEntity<Object> registerExplorer(@RequestBody ExplorerDTO explorerDTO) {
        responseDTO respuesta = explorerService.save(explorerDTO);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // lista lo datos de la tabla explorer
    @GetMapping("/")
    public ResponseEntity<List<ExplorerDTO>> getAllExplorers() {
        List<ExplorerDTO> explorers = explorerService.getAllExplorers();
        return ResponseEntity.ok(explorers);
    }

    // listar segun el ID
    /*
     * Se requiere un dato, el ID
     * PathVariable=captura de información por la URL
     */

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneExplorer(@PathVariable int id) {
        var explorer = explorerService.findById(id);
        if (!explorer.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(explorer, HttpStatus.OK);
    }

    // borrar por ID
}
