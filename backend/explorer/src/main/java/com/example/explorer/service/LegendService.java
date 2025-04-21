package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.LegendDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Legend;
import com.example.explorer.model.Mythology;
import com.example.explorer.repository.ILegend;

@Service
public class LegendService {
    @Autowired
    private ILegend repository;

    // listar todas las columnas
    public List<Legend> findAll() {
        return repository.getListLegendActive();
    }

    // registra y actualiza
    public responseDTO save(LegendDTO legendDTO) {
        // Validación de la historia
        if (legendDTO.getStory() == null || legendDTO.getStory().isEmpty() ||
                legendDTO.getStory().length() > 500) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La historia debe tener un máximo de 500 caracteres y no puede estar vacía.");
        }

        // Validación del título
        if (legendDTO.getTitle() == null || legendDTO.getTitle().isEmpty() ||
                legendDTO.getTitle().length() > 255) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El título debe tener un máximo de 255 caracteres y no puede estar vacío.");
        }

        // Validación del ID de mitología
        if (legendDTO.getMythologyId() <= 0) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El ID de la mitología debe ser un número positivo.");
        }

        // Si todas las validaciones pasan, se guarda el explorador
        Legend legend = convertToModel(legendDTO);
        repository.save(legend);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
    }

    // lista el legenda segun el id
    public Optional<Legend> findById(int id) {
        return repository.findById(id);
    }

    // borrar por explorador por el ID
    public responseDTO deleteLegend(int id) {
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
    public List<Legend> getListLegendForTitle(String filter) {
        return repository.getListLegendForTitle(filter);
    }

    // Convierte un LegendDTO a un modelo Legend
    public Legend convertToModel(LegendDTO legendDTO) {
        Mythology mythology = null;

        // Si el ID de la mitología es válido, creamos un objeto Mythology con ese ID
        if (legendDTO.getMythologyId() != null && legendDTO.getMythologyId() > 0) {
            mythology = new Mythology();
            mythology.setMythologyId(legendDTO.getMythologyId());
        }

        // Retornamos el objeto Legend con los datos del DTO
        return new Legend(
                legendDTO.getIdLegend(), // ID de la leyenda
                mythology, // Objeto Mythology (relación)
                legendDTO.getTitle(), // Título de la leyenda
                legendDTO.getStory(), // Historia de la leyenda
                true // Estado activo
        );
    }

    // Convierte un modelo Legend a un LegendDTO
    public LegendDTO convertToDTO(Legend legend) {
        return new LegendDTO(
                legend.getId(), // ID de la leyenda
                legend.getMythology() != null ? legend.getMythology().getMythologyId() : null, // Devuelve null si no
                                                                                               // hay mitología
                legend.getStory(), // Historia de la leyenda
                legend.getTitle() // Título de la leyenda
        );
    }
}
