package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.CreatureDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Creature;
import com.example.explorer.model.Mythology;
import com.example.explorer.repository.ICreature;

@Service
public class CreatureService {

    @Autowired
    private ICreature repository;

    // listar todas las columnas
    public List<Creature> findAll() {
        return repository.getListCreatureActive();
    }

    // registra y actualiza
    public responseDTO save(CreatureDTO creatureDTO) {
        // validación longitud del nombre
        if (creatureDTO.getName().length() < 1 ||
                creatureDTO.getName().length() > 45) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe estar entre 1 y 45 caracteres");
            return respuesta;
        }

        Creature creature = convertToModel(creatureDTO);
        repository.save(creature);
        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
        return respuesta;
    }

    // listar por palabra clave en el nombre
    public List<Creature> getListCreatureForName(String filter) {
        return repository.getListCreatureForName(filter);
    }

    // lista el explorador segun el id
    public Optional<Creature> findById(int id) {
        return repository.findById(id);
    }

    // borrar por explorador por el ID
    public responseDTO deleteCreature(int id) {
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

    // Convertir de CreatureDTO a Creature (Modelo)
    public Creature convertToModel(CreatureDTO creatureDTO) {
        Mythology mythology = null;

        // Si el ID de la mitología es válido, creamos un objeto Mythology con ese ID
        if (creatureDTO.getMythologyId() > 0) {
            mythology = new Mythology();
            mythology.setMythologyId(creatureDTO.getMythologyId());
        }

        // Retornamos el objeto Creature con los datos del DTO
        return new Creature(
                creatureDTO.getIdCreature(), // ID de la criatura
                creatureDTO.getName(), // Nombre de la criatura
                creatureDTO.getType(), // Tipo de la criatura
                creatureDTO.getDanger(), // Nivel de peligro de la criatura
                mythology, // Objeto Mythology (relación)
                creatureDTO.getImageCreature(), // Imagen de la criatura
                true // Estado activo
        );
    }

    // Convertir de Creature (Modelo) a CreatureDTO
    public CreatureDTO converToDTO(Creature creature) {
        return new CreatureDTO(
                creature.getId(),
                creature.getName(),
                creature.getType(),
                creature.getDanger(),
                creature.getMythology() != null ? creature.getMythology().getMythologyId() : 0, // Extraemos el ID de la
                                                                                                // mitología o asignamos
                                                                                                // 0 si es null
                creature.getImageCreature());
    }
}
