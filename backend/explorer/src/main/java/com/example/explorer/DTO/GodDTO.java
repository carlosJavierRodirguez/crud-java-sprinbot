package com.example.explorer.DTO;


public class GodDTO {

    private int idGod;
    private String name;
    private String domain;
    private int mythologyId;

    public GodDTO(int idGod, String name, String domain, int mythologyId) {
        this.idGod = idGod;
        this.name = name;
        this.domain = domain;
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

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public int getMythologyId() {
        return mythologyId;
    }

    public void setMythologyId(int mythologyId) {
        this.mythologyId = mythologyId;
    }
}
