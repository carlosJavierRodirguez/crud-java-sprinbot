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

    // lista los datos de la tabla explorer
    // @GetMapping("/")
    // public ResponseEntity<Object> getAllUser() {
    //     var listaUsuario = explorerService.findAll();
    //     return new ResponseEntity<>(listaUsuario, HttpStatus.OK);
    // }

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
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteExplorer(@PathVariable int id) {
        var message = explorerService.deleteExplorer(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // filtrar por palabra clave
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getListExplorerForName(@PathVariable String filter) {
        var explorerList = explorerService.getListExplorerForName(filter);
        return new ResponseEntity<>(explorerList, HttpStatus.OK);
    }

}
