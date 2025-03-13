package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.ExplorerDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Explorer;
import com.example.explorer.repository.IExplorer;

@Service
public class ExplorerService {

    @Autowired
    private IExplorer repository;

    // listar todas las columnas
    public List<Explorer> findAll() {
        return repository.findAll();
    }

    // lista el explorador segun el id
    public Optional<Explorer> findById(int id) {
        return repository.findById(id);
    }

    // registra y actualiza
    public responseDTO save(ExplorerDTO explorerDTO) {
        // validación longitud del nombre
        if (explorerDTO.getName().length() < 1 ||
                explorerDTO.getName().length() > 45) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe estar entre 1 y 45 caracteres");
            return respuesta;
        }

        Explorer explorer = convertToModel(explorerDTO);
        repository.save(explorer);
        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
        return respuesta;
    }

    public Explorer convertToModel(ExplorerDTO explorerDTO) {
        return new Explorer(
                explorerDTO.getId(),
                explorerDTO.getName(),
                explorerDTO.getNationality(),
                explorerDTO.getAge(),
                explorerDTO.getReputation(),
                explorerDTO.getImageExplorer());
    }

    public ExplorerDTO convertToDTO(Explorer explorer) {
        return new ExplorerDTO(
                explorer.getId_explorer(),
                explorer.getName(),
                explorer.getNationality(),
                explorer.getAge(),
                explorer.getReputation(),
                explorer.getImageExplorer());
    }

    // borrar por explorador por el ID
    public responseDTO deleteExplorer(int id) {
        if (!findById(id).isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.OK.toString(),
                    "The register does not exist");
            return respuesta;
        }
        repository.deleteById(id);
        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente");
        return respuesta;
    }

}
