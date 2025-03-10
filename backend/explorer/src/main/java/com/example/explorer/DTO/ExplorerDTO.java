package com.example.explorer.DTO;

public class ExplorerDTO {

    private int id;
    private String name;
    private String nationality;
    private int age;
    private int reputation;

    public ExplorerDTO(int id, String name, String nationality, int age, int reputation) {
        this.id = id;
        this.name = name;
        this.nationality = nationality;
        this.age = age;
        this.reputation = reputation;
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

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getReputation() {
        return reputation;
    }

    public void setReputation(int reputation) {
        this.reputation = reputation;
    }
}
