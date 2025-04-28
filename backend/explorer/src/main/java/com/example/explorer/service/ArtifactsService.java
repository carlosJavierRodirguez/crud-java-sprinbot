package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.ArtifactsDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Artifacts;
import com.example.explorer.model.Mythology;
import com.example.explorer.repository.IArtifacts;

@Service
public class ArtifactsService {

    @Autowired
    private IArtifacts repository;

    // listar todas las columnas
    public List<Artifacts> findAll() {
        return repository.getListArtifactsActive();
    }

    // registra y actualiza
    public responseDTO save(ArtifactsDTO artifactsDTO) {
    
        if (artifactsDTO.getImageArtifact() == null || artifactsDTO.getImageArtifact().isEmpty() ||
                artifactsDTO.getImageArtifact().length() > 255) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La imagen debe tener un máximo de 255 caracteres y no puede estar vacía.");
        }

        // Validación del nombre
        if (artifactsDTO.getName() == null || artifactsDTO.getName().isEmpty() ||
                artifactsDTO.getName().length() > 100) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe tener un máximo de 100 caracteres y no puede estar vacío.");
        }

        // Validación del ID de mitología
        if (artifactsDTO.getMythologyId() == null || artifactsDTO.getMythologyId() <= 0) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El ID de la mitología debe ser un número positivo y no puede ser nulo.");
        }

        // Si todas las validaciones pasan, se guarda el artefacto
        Artifacts artifact = convertToModel(artifactsDTO);
        repository.save(artifact);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
    }

    // lista el legenda segun el id
    public Optional<Artifacts> findById(int id) {
        return repository.findById(id);
    }

    // borrar por explorador por el ID
    public responseDTO deleteArtefact(int id) {
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

    // listar por palabra clave en el titulo
    public List<Artifacts> getListArtifactsForName(String filter) {
        return repository.getListArtifactsForName(filter);
    }

    /**
     * Convierte un objeto ArtifactsDTO a un modelo Artifacts.
     *
     * @param artifactsDTO el objeto ArtifactsDTO que contiene los datos.
     * @return un objeto Artifacts construido a partir del DTO.
     */
    public Artifacts convertToModel(ArtifactsDTO artifactsDTO) {
        Mythology mythology = null;

        if (artifactsDTO.getMythologyId() != null && artifactsDTO.getMythologyId() > 0) {
            mythology = new Mythology();
            mythology.setMythologyId(artifactsDTO.getMythologyId());
        }

        return new Artifacts(
                artifactsDTO.getIdArtifact(),
                artifactsDTO.getName(),
                mythology,
                artifactsDTO.getImageArtifact(),
                true);
    }

    /**
     * Convierte un objeto Artifacts en un ArtifactsDTO.
     *
     * @param artifacts el objeto Artifacts a convertir.
     * @return un objeto ArtifactsDTO con los datos del modelo.
     */
    public ArtifactsDTO convertToDTO(Artifacts artifacts) {
        Integer mythologyId = (artifacts.getMythology() != null)
                ? artifacts.getMythology().getMythologyId()
                : null;

        return new ArtifactsDTO(
                artifacts.getId(),
                artifacts.getName(),
                artifacts.getImageArtifact(),
                mythologyId);
    }

}
