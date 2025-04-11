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
        // Validación del nombre
        if (creatureDTO.getName() == null || creatureDTO.getName().isEmpty() ||
                creatureDTO.getName().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe tener entre 1 y 100 caracteres y no puede estar vacío.");
        }

        // Validación del tipo
        if (creatureDTO.getType() == null || creatureDTO.getType().isEmpty() ||
                creatureDTO.getType().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El tipo debe tener entre 1 y 100 caracteres y no puede estar vacío.");
        }

        // Validación del nivel de peligro (danger)
        if (creatureDTO.getDanger() == null || creatureDTO.getDanger().isEmpty()) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nivel de peligro no puede estar vacío.");
        }

        // Validación de la mitología
        if (creatureDTO.getMythologyId() != null && creatureDTO.getMythologyId() <= 0) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La mitología debe ser válida y no puede ser menor o igual a 0.");
        }

        // Validación de la URL de la imagen
        if (creatureDTO.getImageCreature() == null || creatureDTO.getImageCreature().isEmpty() ||
                !creatureDTO.getImageCreature().matches("^(http|https)://.+\\..+$")) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La URL de la imagen debe ser válida y comenzar con http:// o https://.");
        }

        // Si todas las validaciones pasan, se guarda la criatura
        Creature creature = convertToModel(creatureDTO);
        repository.save(creature);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "La criatura se guardó correctamente.");
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
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.");
        }
        repository.deleteById(id);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente.");
    }

    // Convertir de CreatureDTO a Creature (Modelo)
    public Creature convertToModel(CreatureDTO creatureDTO) {
        Mythology mythology = null;

        // Si el ID de la mitología es válido, creamos un objeto Mythology con ese ID
        if (creatureDTO.getMythologyId() != null && creatureDTO.getMythologyId() > 0) {
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
                creature.getMythology() != null ? creature.getMythology().getMythologyId() : null, // Extraemos el ID de
                                                                                                   // la
                                                                                                   // mitología o
                                                                                                   // asignamos
                                                                                                   // null si es null
                creature.getImageCreature());
    }
}
