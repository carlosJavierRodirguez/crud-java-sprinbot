package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.DiscoveryDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Discovery;
import com.example.explorer.model.Explorer;
import com.example.explorer.model.MysticLocation;
import com.example.explorer.repository.IDiscovery;

@Service
public class DiscoveryService {
    @Autowired
    private IDiscovery repository;

    // listar todas las columnas
    public List<Discovery> findAll() {
        return repository.getListDiscoveryActive();
    }

    // listar por palabra clave en el nombre
    public List<Discovery> getListDiscoveryForExplorerName(String filter) {
        return repository.getListDiscoveryForExplorerName(filter);
    }

    // lista el explorador segun el id
    public Optional<Discovery> findById(int id) {
        return repository.findById(id);
    }

    // borrar por explorador por el ID
    public responseDTO deleteDiscovery(int id) {
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

    // Registra y actualiza Discovery
    public responseDTO save(DiscoveryDTO discoveryDTO) {
        // Validación del ID del explorador
        if (discoveryDTO.getExplorerId() == null || discoveryDTO.getExplorerId() <= 0) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El ID del explorador debe ser válido y no puede ser menor o igual a 0.");
        }

        // Validación del ID de la ubicación mística
        if (discoveryDTO.getLocationId() == null || discoveryDTO.getLocationId() <= 0) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El ID de la ubicación mística debe ser válido y no puede ser menor o igual a 0.");
        }

        // Validación de la fecha
        if (discoveryDTO.getDate() == null) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La fecha no puede estar vacía.");
        }

        // Si todas las validaciones pasan, se prepara el objeto Discovery
        Discovery discovery = convertToModel(discoveryDTO);

        // Verificar si es un registro nuevo o una actualización
        if (discoveryDTO.getId() > 0) {
            // Si el ID es mayor que 0, es una actualización
            Optional<Discovery> existingDiscoveryOptional = repository.findById(discoveryDTO.getId());

            if (!existingDiscoveryOptional.isPresent()) {
                return new responseDTO(
                        HttpStatus.NOT_FOUND.toString(),
                        "El descubrimiento con el ID " + discoveryDTO.getId() + " no fue encontrado.");
            }

            // Actualizar los datos del descubrimiento existente
            Discovery existingDiscovery = existingDiscoveryOptional.get();
            existingDiscovery.setExplorer(discovery.getExplorer());
            existingDiscovery.setMysticLocation(discovery.getMysticLocation());
            existingDiscovery.setDate(discovery.getDate());
            existingDiscovery.setStatus(discovery.getStatus());

            // Guardar el descubrimiento actualizado
            repository.save(existingDiscovery);

            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El descubrimiento se actualizó correctamente.");
        } else {
            // Si el ID es 0 o no existe, es una inserción
            repository.save(discovery);
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El descubrimiento se guardó correctamente.");
        }
    }

    // Convertir de DiscoveryDTO a Discovery (Modelo)
    public Discovery convertToModel(DiscoveryDTO discoveryDTO) {
        Explorer explorer = null;
        MysticLocation mysticLocation = null;

        // Si el ID del explorador es válido, creamos un objeto Explorer con ese ID
        if (discoveryDTO.getExplorerId() != null && discoveryDTO.getExplorerId() > 0) {
            explorer = new Explorer();
            explorer.setId_explorer(discoveryDTO.getExplorerId());
        }

        // Si el ID de la ubicación mística es válido, creamos un objeto MysticLocation
        // con ese ID
        if (discoveryDTO.getLocationId() != null && discoveryDTO.getLocationId() > 0) {
            mysticLocation = new MysticLocation();
            mysticLocation.setId(discoveryDTO.getLocationId());
        }

        // Retornamos el objeto Discovery con los datos del DTO
        return new Discovery(
                discoveryDTO.getId(), // ID del descubrimiento
                explorer, // Relación con el explorador
                mysticLocation, // Relación con la ubicación mística
                discoveryDTO.getDate(), // Fecha del descubrimiento
                true // Estado activo
        );
    }

    // Convertir de Discovery (Modelo) a DiscoveryDTO
    public DiscoveryDTO convertToDTO(Discovery discovery) {
        Integer explorerId = (discovery.getExplorer() != null) ? discovery.getExplorer().getId_explorer() : null;
        Integer locationId = (discovery.getMysticLocation() != null) ? discovery.getMysticLocation().getId()
                : null;

        // Retornamos un nuevo DiscoveryDTO con los datos del modelo
        return new DiscoveryDTO(
                discovery.getId(), // ID del descubrimiento
                explorerId, // ID del explorador
                locationId, // ID de la ubicación mística
                discovery.getDate() // Fecha del descubrimiento
        );
    }

}
