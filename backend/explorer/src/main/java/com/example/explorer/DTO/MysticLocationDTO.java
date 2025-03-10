package com.example.explorer.DTO;

public class MysticLocationDTO {

    private int id;
    private String name;
    private String region;
    private String description;

    public MysticLocationDTO(int id, String name, String region, String description) {
        this.id = id;
        this.name = name;
        this.region = region;
        this.description = description;
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
