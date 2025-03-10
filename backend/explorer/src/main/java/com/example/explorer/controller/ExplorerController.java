package com.example.explorer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.explorer.DTO.ExplorerDTO;
import com.example.explorer.service.ExplorerService;

@RestController
@RequestMapping("/api/v1/explorer")
public class ExplorerController {

    @Autowired
    private ExplorerService explorerService;

    @PostMapping("/")
    public ResponseEntity<String> registerExplorer(@RequestBody ExplorerDTO explorerDTO) {
        explorerService.save(explorerDTO);
        return new ResponseEntity<>("Explorer registered successfully", HttpStatus.CREATED);
    }
}
