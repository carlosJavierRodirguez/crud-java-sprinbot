package com.example.explorer.DTO;

public class MysticLocationDTO {

    private int id;
    private String name;
    private String coordinates;
    private Integer mythologyId;

    public MysticLocationDTO(int id, String name, String coordinates, Integer mythologyId) {
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
        this.mythologyId = mythologyId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public Integer getMythologyId() {
        return mythologyId;
    }

    public void setMythologyId(Integer mythologyId) {
        this.mythologyId = mythologyId;
    }

}
