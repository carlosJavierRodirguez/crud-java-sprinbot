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
        return repository.getListExplorerActive();
    }

    // listar mejores 4 exploradores
    public List<Explorer> getTopExplorer() {
        return repository.getTopExplorer();
    }

    // listar por palabra clave en el nombre
    public List<Explorer> getListExplorerForName(String filter) {

        return repository.getListExplorerForName(filter);

    }

    // listar por edad
    public List<Explorer> getListExplorerForAge(int filter) {
        return repository.getListExplorerForAge(filter);
    }

    // listar por reputación
    public List<Explorer> getListExplorerForReputation(int filter) {
        return repository.getListExplorerForReputation(filter);
    }

    // listar por nacionalidad
    public List<Explorer> getListExplorerForNationality(String filter) {
        return repository.getListExplorerForNationality(filter);
    }

    // lista el explorador segun el id
    public Optional<Explorer> findById(int id) {
        return repository.findById(id);
    }

    // registra y actualiza
    public responseDTO save(ExplorerDTO explorerDTO) {
        // Validación del nombre
        if (explorerDTO.getName() == null || explorerDTO.getName().isEmpty() ||
                explorerDTO.getName().length() > 45 ||
                !explorerDTO.getName().matches("^[a-zA-Z\\s]+$")) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe tener un máximo de 45 caracteres y solo puede contener letras y espacios.");
        }

        // Validación de la nacionalidad
        if (explorerDTO.getNationality() == null || explorerDTO.getNationality().isEmpty() ||
                explorerDTO.getNationality().length() > 45 ||
                !explorerDTO.getNationality().matches("^[a-zA-Z\\s]+$")) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La nacionalidad debe tener un máximo de 45 caracteres y solo puede contener letras y espacios.");
        }

        // Validación de la edad
        if (explorerDTO.getAge() < 1 || explorerDTO.getAge() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La edad debe ser un número entre 1 y 100.");
        }

        // Validación de la reputación
        if (explorerDTO.getReputation() == null || explorerDTO.getReputation() < 0
                || explorerDTO.getReputation() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La reputación debe ser un número entre 0 y 100.");
        }

        // Validación de la URL de la imagen
        if (explorerDTO.getImageExplorer() == null || explorerDTO.getImageExplorer().isEmpty() ||
                !explorerDTO.getImageExplorer().matches("^(http|https)://.+\\..+$")) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La URL de la imagen debe ser válida y comenzar con http:// o https://.");
        }

        // Si todas las validaciones pasan, se guarda el explorador
        Explorer explorer = convertToModel(explorerDTO);
        repository.save(explorer);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
    }

    public Explorer convertToModel(ExplorerDTO explorerDTO) {
        return new Explorer(
                explorerDTO.getId(),
                explorerDTO.getName(),
                explorerDTO.getNationality(),
                explorerDTO.getAge(),
                explorerDTO.getReputation(),
                explorerDTO.getImageExplorer(),
                true);
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
