package com.example.explorer.DTO;

import java.time.LocalDate;

public class DiscoveryDTO {

    private int id;
    private int explorerId;
    private int locationId;
    private LocalDate date;

    public DiscoveryDTO(int id, int explorerId, int locationId, LocalDate date) {
        this.id = id;
        this.explorerId = explorerId;
        this.locationId = locationId;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getExplorerId() {
        return explorerId;
    }

    public void setExplorerId(int explorerId) {
        this.explorerId = explorerId;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
