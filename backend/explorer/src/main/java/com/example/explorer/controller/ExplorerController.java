package com.example.explorer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.explorer.DTO.ExplorerDTO;
import com.example.explorer.service.ExplorerService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/explorer")
public class ExplorerController {

    @Autowired
    private ExplorerService explorerService;

    // guarda los datos
    @PostMapping("/")
    public ResponseEntity<String> registerExplorer(@RequestBody ExplorerDTO explorerDTO) {
        explorerService.save(explorerDTO);
        return new ResponseEntity<>("Explorer registered successfully OK", HttpStatus.CREATED);
    }

    // lista lo datos de la tabla explorer
    @GetMapping("/list")
    public ResponseEntity<List<ExplorerDTO>> getAllExplorers() {
        List<ExplorerDTO> explorers = explorerService.getAllExplorers();
        return ResponseEntity.ok(explorers);
    }
}
