package com.example.explorer.DTO;

import java.time.LocalDate;

public class MeetingDTO {
    private int id_Meeting;
    private Integer id_explorer;
    private Integer id_creature;
    private LocalDate date_meeting;

    public MeetingDTO(int id_Meeting, Integer id_explorer, Integer id_creature, LocalDate date_meeting) {
        this.id_Meeting = id_Meeting;
        this.id_explorer = id_explorer;
        this.id_creature = id_creature;
        this.date_meeting = date_meeting;
    }

    public int getId_Meeting() {
        return id_Meeting;
    }

    public void setId_Meeting(int id_Meeting) {
        this.id_Meeting = id_Meeting;
    }

    public Integer getId_explorer() {
        return id_explorer;
    }

    public void setId_explorer(Integer id_explorer) {
        this.id_explorer = id_explorer;
    }

    public Integer getId_creature() {
        return id_creature;
    }

    public void setId_creature(Integer id_creature) {
        this.id_creature = id_creature;
    }

    public LocalDate getDate_meeting() {
        return date_meeting;
    }

    public void setDate_meeting(LocalDate date_meeting) {
        this.date_meeting = date_meeting;
    }

}
