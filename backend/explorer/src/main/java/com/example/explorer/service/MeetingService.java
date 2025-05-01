package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.MeetingDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Creature;
import com.example.explorer.model.Explorer;
import com.example.explorer.model.Meeting;
import com.example.explorer.repository.IMeeting;

@Service
public class MeetingService {

    @Autowired
    private IMeeting repository;

    // lista segun el id
    public Optional<Meeting> findById(int id) {
        return repository.findById(id);
    }

    // lista todos los datos de la tabla
    public List<Meeting> findAll() {
        return repository.getListMeeting();
    }

    // listar por palabra clave en el nombre del explorador
    public List<Meeting> filterForNameExplorer(String filter) {
        return repository.filterForNameExplorer(filter);
    }

    // borrar por el ID
    public responseDTO deleteMeeting(int id) {
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

    // registra y actualiza
    public responseDTO save(MeetingDTO meetingDTO) {
        // Validar la fecha del encuentro
        if (meetingDTO.getDate_meeting() == null) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La fecha del encuentro no puede ser nula.");
        }

        // Validar ID del explorador
        if (meetingDTO.getId_explorer() == null || meetingDTO.getId_explorer() <= 0) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Debe seleccionar un explorador válido.");
        }

        // Validar ID de la criatura
        if (meetingDTO.getId_creature() == null || meetingDTO.getId_creature() <= 0) {
            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Debe seleccionar una criatura válida.");
        }

        boolean esActualizacion = false;
        if (meetingDTO.getId_Meeting() != null && meetingDTO.getId_Meeting() > 0) {
            Optional<Meeting> existente = repository.findById(meetingDTO.getId_Meeting());
            esActualizacion = existente.isPresent();
        }

        // Convertir y guardar o actualizar
        Meeting meeting = convertToModel(meetingDTO);
        repository.save(meeting);

        String mensaje = esActualizacion
                ? "El encuentro fue actualizado correctamente."
                : "El encuentro fue guardado exitosamente.";

        return new responseDTO(HttpStatus.OK.toString(), mensaje);
    }

    // Convertir de MeetingDTO a Meeting (Modelo)
    public Meeting convertToModel(MeetingDTO meetingDTO) {
        Explorer explorer = null;
        Creature creature = null;

        int id = (meetingDTO.getId_Meeting() != null) ? meetingDTO.getId_Meeting() : 0;

        // Si el ID del explorador es válido, creamos un objeto Explorer con ese ID
        if (meetingDTO.getId_explorer() != null && meetingDTO.getId_explorer() > 0) {
            explorer = new Explorer();
            explorer.setId_explorer(meetingDTO.getId_explorer());
        }

        // Si el ID de la criatura es válido, creamos un objeto Creature con ese ID
        if (meetingDTO.getId_creature() != null && meetingDTO.getId_creature() > 0) {
            creature = new Creature();
            creature.setId(meetingDTO.getId_creature());
        }

        // Retornamos el objeto Meeting con los datos del DTO
        return new Meeting(
                id,
                explorer,
                creature,
                meetingDTO.getDate_meeting());

    }

    // Convertir de Meeting (Modelo) a MeetingDTO
    public MeetingDTO convertToDTO(Meeting meeting) {
        Integer id_explorer = (meeting.getExplorer() != null) ? meeting.getExplorer().getId_explorer() : null;
        Integer id_creature = (meeting.getCreature() != null) ? meeting.getCreature().getId() : null;

        // Retornamos un nuevo MeetingDTO con los datos del modelo
        return new MeetingDTO(
                meeting.getId_Meeting(), // ID del descubrimiento
                id_explorer, // ID del explorador
                id_creature, // ID de la ubicación mística
                meeting.getDate_meeting() // Fecha del descubrimiento
        );
    }

}
