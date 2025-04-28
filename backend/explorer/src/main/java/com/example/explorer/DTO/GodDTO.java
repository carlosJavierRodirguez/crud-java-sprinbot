package com.example.explorer.DTO;

public class GodDTO {

    private int idGod;
    private String name;
    private Integer mythologyId;
    private String imageGod;

    public GodDTO(int idGod, String name, String imageGod, Integer mythologyId) {
        this.idGod = idGod;
        this.name = name;
        this.imageGod = imageGod;
        this.mythologyId = mythologyId;
    }

    public int getIdGod() {
        return idGod;
    }

    public void setIdGod(int idGod) {
        this.idGod = idGod;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageGod() {
        return imageGod;
    }

    public void setImageGod(String imageGod) {
        this.imageGod = imageGod;
    }

    public Integer getMythologyId() {
        return mythologyId;
    }

    public void setMythologyId(Integer mythologyId) {
        this.mythologyId = mythologyId;
    }
}
