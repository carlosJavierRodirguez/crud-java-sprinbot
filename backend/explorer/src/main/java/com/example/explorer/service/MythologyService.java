package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.MythologyDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Mythology;
import com.example.explorer.repository.IMythology;

@Service
public class MythologyService {

    @Autowired
    private IMythology repository;

    // registra y actualiza
    public responseDTO save(MythologyDTO mythologyDTO) {
        // Validación del nombre
        if (mythologyDTO.getName() == null || mythologyDTO.getName().isEmpty()) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre no puede estar vacío.");
        }

        if (mythologyDTO.getName().length() < 3 || mythologyDTO.getName().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe tener entre 3 y 100 caracteres.");
        }

        if (!mythologyDTO.getName().matches("^[a-zA-Z\\s]+$")) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre solo puede contener letras y espacios.");
        }

        // Si el ID es mayor que 0, se está actualizando una mitología existente
        if (mythologyDTO.getIdMythology() > 0) {
            Optional<Mythology> existingMythology = repository.findById(mythologyDTO.getIdMythology());
            if (!existingMythology.isPresent()) {
                return new responseDTO(
                        HttpStatus.BAD_REQUEST.toString(),
                        "La mitología con el ID proporcionado no existe.");
            }
        }

        // Si todas las validaciones pasan, se guarda la mitología
        Mythology mythology = convertToModel(mythologyDTO);
        repository.save(mythology);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "La mitología se guardó correctamente.");
    }

    // listar todas las columnas
    public List<Mythology> findAll() {
        return repository.getListMythologyActive();
    }

    // listar por palabra clave en el nombre
    public List<Mythology> getListMythologyForName(String filter) {
        return repository.getListMythologyForName(filter);
    }

    // lista el explorador segun el id
    public Optional<Mythology> findById(int id) {
        return repository.findById(id);
    }

    // borrar por explorador por el ID
    public responseDTO deleteMythology(int id) {
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.");
        }
        repository.deleteById(id);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente.");
    }

    public Mythology convertToModel(MythologyDTO mythologyDTO) {
        return new Mythology(
                mythologyDTO.getIdMythology(),
                mythologyDTO.getName(),
                true);
    }

    public MythologyDTO converToDTO(Mythology mythology) {
        return new MythologyDTO(
                mythology.getMythologyId(),
                mythology.getName());
    }

}
