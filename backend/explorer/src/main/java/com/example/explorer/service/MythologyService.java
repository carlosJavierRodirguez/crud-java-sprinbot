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
        // validación longitud del nombre
        if (mythologyDTO.getName().length() < 3 ||
                mythologyDTO.getName().length() > 100) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe estar entre 3 y 100 caracteres");
            return respuesta;
        }

        Mythology mythology = convertToModel(mythologyDTO);
        repository.save(mythology);
        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
        return respuesta;
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
