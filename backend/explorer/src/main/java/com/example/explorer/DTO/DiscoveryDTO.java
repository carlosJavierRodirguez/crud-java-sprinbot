package com.example.explorer.DTO;

import java.time.LocalDate;

public class DiscoveryDTO {

    private int id;
    private Integer explorerId;
    private Integer locationId;
    private LocalDate date;

    public DiscoveryDTO(int id, Integer explorerId, Integer locationId, LocalDate date) {
        this.id = id;
        this.explorerId = explorerId;
        this.locationId = locationId;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getExplorerId() {
        return explorerId;
    }

    public void setExplorerId(Integer explorerId) {
        this.explorerId = explorerId;
    }

    public Integer getLocationId() {
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
