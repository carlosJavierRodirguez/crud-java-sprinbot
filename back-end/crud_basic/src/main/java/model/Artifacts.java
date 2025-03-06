package model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "artifacts")
public class Artifacts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_artifact")
    private int id_artifact;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "power", length = 100, nullable = false)
    private String power;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_mythology", referencedColumnName = "id_mythology")
    private Mythology mythology;

    public Artifacts(int id_artifact, String name, String power, Mythology mythology) {
        this.id_artifact = id_artifact;
        this.name = name;
        this.power = power;
        this.mythology = mythology;
    }

    public void setId(int id_artifact) {
        this.id_artifact = id_artifact;
    }

    public int getId() {
        return id_artifact;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public String getPower() {
        return power;
    }

    public void setMythology(Mythology mythology) {
        this.mythology = mythology;
    }

    public Mythology getMythology() {
        return mythology;
    }
}
