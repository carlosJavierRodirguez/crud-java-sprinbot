package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.AncientLanguageDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.AncientLanguage;
import com.example.explorer.model.Explorer;
import com.example.explorer.repository.IAncientLanguage;

@Service
public class AncientLanguageService {

    @Autowired
    private IAncientLanguage repository;

    // Listar todas las lenguas activas
    public List<AncientLanguage> findAll() {
        return repository.getListLanguageActive();
    }

    // Buscar por nombre
    public List<AncientLanguage> findByName(String filter) {
        return repository.getListLanguageForName(filter);
    }

    // Registrar o actualizar AncientLanguage
    public responseDTO save(AncientLanguageDTO dto) {
        // Validaciones
        if (dto.getName() == null || dto.getName().isEmpty() || dto.getName().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe tener un máximo de 100 caracteres y no puede estar vacío.");
        }

        if (dto.getOriginRegion() != null && dto.getOriginRegion().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La región de origen debe tener un máximo de 100 caracteres.");
        }

        if (dto.getWritingSystem() != null && dto.getWritingSystem().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El sistema de escritura debe tener un máximo de 100 caracteres.");
        }

        AncientLanguage ancientLanguage = convertToModel(dto);
        repository.save(ancientLanguage);

        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
    }

    // lista segun el id
    public Optional<AncientLanguage> findById(int id) {
        return repository.findById(id);
    }

    // Eliminar por ID
    public responseDTO delete(int id) {
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El lenguaje no existe.");
        }

        repository.deleteById(id);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente.");
    }

    // Convertir de DTO a Modelo
    public AncientLanguage convertToModel(AncientLanguageDTO dto) {
        Explorer explorer = null;

        // Solo creamos el Explorer si hay un ID válido
        if (dto.getExplorerId() != null && dto.getExplorerId() > 0) {
            explorer = new Explorer();
            explorer.setId_explorer(dto.getExplorerId());
        }

        AncientLanguage ancientLanguage = new AncientLanguage();
        ancientLanguage.setId_ancient_language(dto.getIdLanguage());
        ancientLanguage.setName(dto.getName());
        ancientLanguage.setOriginRegion(dto.getOriginRegion());
        ancientLanguage.setWritingSystem(dto.getWritingSystem());
        ancientLanguage.setExplorer(explorer);
        ancientLanguage.setStatus(true); // Siempre lo creamos activo

        return ancientLanguage;
    }

    // Convertir de Modelo a DTO
    public AncientLanguageDTO convertToDTO(AncientLanguage ancientLanguage) {
        Integer explorerId = (ancientLanguage.getExplorer() != null) ? ancientLanguage.getExplorer().getId_explorer()
                : null;

        return new AncientLanguageDTO(
                ancientLanguage.getId_ancient_language(),
                ancientLanguage.getName(),
                ancientLanguage.getOriginRegion(),
                ancientLanguage.getWritingSystem(),
                explorerId);
    }

}
