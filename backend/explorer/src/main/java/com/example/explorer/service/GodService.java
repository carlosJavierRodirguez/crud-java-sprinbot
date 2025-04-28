package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.GodDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.God;
import com.example.explorer.model.Mythology;
import com.example.explorer.repository.IGod;

@Service
public class GodService {

    @Autowired
    private IGod repository;

    // lista el dios segun el id
    public Optional<God> findById(int id) {
        return repository.findById(id);
    }

    // listar todas las columnas
    public List<God> findAll() {
        return repository.getListGodActive();
    }

    // registra y actualiza
    public responseDTO save(GodDTO godDTO) {

        // Validación del nombre
        String name = godDTO.getName() != null ? godDTO.getName().trim() : null;

        // Verifica si el nombre es nulo o vacío
        if (name == null || name.isEmpty()) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre no puede estar vacío o contener solo espacios en blanco.");
        }

        // Verifica la longitud del nombre
        if (name.length() < 1 || name.length() > 50) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe tener entre 1 y 50 caracteres.");
        }

        // Verifica si el nombre contiene caracteres no permitidos
        if (!name.matches("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$")) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre solo puede contener letras y espacios.");
        }

        // Validación de la URL de la imagen
        if (godDTO.getImageGod() == null || godDTO.getImageGod().isEmpty() ||
                !godDTO.getImageGod().matches("^(http|https)://.+\\..+$")) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La URL de la imagen debe ser válida y comenzar con http:// o https://.");
        }

        // Si todas las validaciones pasan, se guarda la criatura
        God god = convertToModel(godDTO);
        repository.save(god);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente.");
    }

    // borrar dios por el ID
    public responseDTO deleteGod(int id) {
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

    // listar por palabra clave en el nombre
    public List<God> getListGodForName(String filter) {
        return repository.getListGodForName(filter);
    }

    /**
     * Convierte un objeto GodDTO (Data Transfer Object) a un modelo God.
     * 
     * @param godDTO El objeto GodDTO que contiene los datos a convertir.
     * @return Un objeto God con los datos del DTO.
     */

    public God convertToModel(GodDTO godDTO) {
        Mythology mythology = null;

        // Si el ID de la mitología es válido (no nulo y mayor a 0),
        // se crea un objeto Mythology con ese ID.
        if (godDTO.getMythologyId() != null && godDTO.getMythologyId() > 0) {
            mythology = new Mythology();
            mythology.setMythologyId(godDTO.getMythologyId());
        }

        // Retorna un objeto God con los datos proporcionados por el DTO.
        return new God(
                godDTO.getIdGod(), // ID del dios.
                godDTO.getName(), // Nombre del dios.
                mythology, // Objeto Mythology asociado (relación).
                godDTO.getImageGod(), // Imagen del dios.
                true // Estado activo (por defecto).
        );
    }

    /**
     * Convierte un objeto God (modelo) a un objeto GodDTO (Data Transfer Object).
     * 
     * @param god El objeto God que contiene los datos a convertir.
     * @return Un objeto GodDTO con los datos del modelo.
     */
    public GodDTO convertToDTO(God god) {
        return new GodDTO(
                god.getId(), // ID del dios.
                god.getName(), // Nombre del dios.
                god.getImageGod(), // Imagen del dios.
                god.getMythology() != null // Si la mitología no es nula,
                        ? god.getMythology().getMythologyId() // obtiene el ID de la mitología.
                        : null // De lo contrario, retorna null.
        );
    }

}
