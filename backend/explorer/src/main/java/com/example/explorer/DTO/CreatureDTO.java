package com.example.explorer.DTO;

public class CreatureDTO {

    private int idCreature;
    private String name;
    private String type;
    private String danger;
    private Integer mythologyId;
    private String imageCreature;

    public CreatureDTO(int idCreature, String name, String type, String danger, Integer mythologyId,
            String imageCreature) {
        this.idCreature = idCreature;
        this.name = name;
        this.type = type;
        this.danger = danger;
        this.imageCreature = imageCreature;
        this.mythologyId = mythologyId;
    }

    public int getIdCreature() {
        return idCreature;
    }

    public void setIdCreature(int idCreature) {
        this.idCreature = idCreature;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDanger() {
        return danger;
    }

    public void setDanger(String danger) {
        this.danger = danger;
    }

    public Integer getMythologyId() {
        return mythologyId;
    }

    public void setMythologyId(Integer mythologyId) {
        this.mythologyId = mythologyId;
    }

    public String getImageCreature() {
        return imageCreature;
    }

    public void setImageCreature(String imageCreature) {
        this.imageCreature = imageCreature;
    }

}
