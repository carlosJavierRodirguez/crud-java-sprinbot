package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.MysticLocationDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.MysticLocation;
import com.example.explorer.model.Mythology;
import com.example.explorer.repository.IMysticLocation;

@Service
public class MysticLocationService {

    @Autowired
    private IMysticLocation repository;

    public Optional<MysticLocation> findById(int id) {
        return repository.findById(id);
    }

    public List<MysticLocation> findAll() {
        return repository.getListMysticLocationActive();
    }

    public responseDTO save(MysticLocationDTO mysticLocationDTO) {
        // Validación de la historia
        if (mysticLocationDTO.getCoordinates() == null || mysticLocationDTO.getCoordinates().isEmpty() ||
                mysticLocationDTO.getCoordinates().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Las coordenadas debe tener un máximo de 100 caracteres y no puede estar vacía.");
        }

        // Validación del título
        if (mysticLocationDTO.getName() == null || mysticLocationDTO.getName().isEmpty() ||
                mysticLocationDTO.getName().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe tener un máximo de 100 caracteres y no puede estar vacío.");
        }

        // Validación del ID de mitología
        if (mysticLocationDTO.getMythologyId() <= 0) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El ID de la mitología debe ser un número positivo.");
        }

        // Si todas las validaciones pasan, se guarda el explorador
        MysticLocation mysticLocation = convertToModel(mysticLocationDTO);
        repository.save(mysticLocation);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
    }

    public responseDTO deleteMysticLocation(int id) {
        // Verifica si la ubicación mística existe antes de eliminarla
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.");
        }
        // Elimina la ubicación mística
        repository.deleteById(id);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente.");
    }

    public List<MysticLocation> getListMysticLocationForName(String filter) {
        return repository.getListMysticLocationForName(filter);
    }

    /**
     * Convierte un objeto MysticLocationDTO (Data Transfer Object) a un modelo
     * MysticLocation.
     * 
     * @param mysticLocationDTO El objeto MysticLocationDTO que contiene los datos a
     *                          convertir.
     * @return Un objeto MysticLocation con los datos del DTO.
     */
    public MysticLocation convertToModel(MysticLocationDTO mysticLocationDTO) {
        Mythology mythology = null;

        // Si el ID de la mitología es válido (no nulo y mayor a 0),
        // se crea un objeto Mythology con ese ID.
        if (mysticLocationDTO.getMythologyId() != null && mysticLocationDTO.getMythologyId() > 0) {
            mythology = new Mythology();
            mythology.setMythologyId(mysticLocationDTO.getMythologyId());
        }

        // Retorna un objeto MysticLocation con los datos proporcionados por el DTO.
        return new MysticLocation(
                mysticLocationDTO.getId(), // ID de la ubicación mística.
                mysticLocationDTO.getName(), // Nombre de la ubicación mística.
                mysticLocationDTO.getCoordinates(), // Coordenadas de la ubicación.
                mythology, // Objeto Mythology asociado (relación).
                true // Estado activo (por defecto).
        );
    }

    /**
     * Convierte un objeto MysticLocation (modelo) a un objeto MysticLocationDTO
     * (Data Transfer Object).
     * 
     * @param mysticLocation El objeto MysticLocation que contiene los datos a
     *                       convertir.
     * @return Un objeto MysticLocationDTO con los datos del modelo.
     */
    public MysticLocationDTO convertToDTO(MysticLocation mysticLocation) {
        return new MysticLocationDTO(
                mysticLocation.getId(), // ID de la ubicación mística.
                mysticLocation.getName(), // Nombre de la ubicación mística.
                mysticLocation.getCoordinates(), // Coordenadas de la ubicación.
                mysticLocation.getMythology() != null // Si la mitología no es nula,
                        ? mysticLocation.getMythology().getMythologyId() // obtiene el ID de la mitología.
                        : null // De lo contrario, retorna null.
        );
    }
}
