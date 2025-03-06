package model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity(name = "relic")
public class Relic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_relic")
    private int id_relic;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_artifact", referencedColumnName = "id_mythology")
    private Artifacts artifacts;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_location", referencedColumnName = "iid_location")
    private MysticLocation mysticLocation;

    @Lob
    @Column(name = "history", nullable = false, columnDefinition = "TEXT")
    private String history;

    public Relic(int id_relic, Artifacts artifacts, MysticLocation mysticLocation, String history) {
        this.id_relic = id_relic;
        this.artifacts = artifacts;
        this.mysticLocation = mysticLocation;
        this.history = history;
    }

    public void setId(int id_relic) {
        this.id_relic = id_relic;
    }

    public int getId() {
        return id_relic;
    }

    public void setArtifacts(Artifacts artifacts) {
        this.artifacts = artifacts;
    }

    public Artifacts getArtifacts() {
        return artifacts;
    }

    public void setMysticLocation(MysticLocation mysticLocation) {
        this.mysticLocation = mysticLocation;
    }

    public MysticLocation getMysticLocation() {
        return mysticLocation;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getHistory() {
        return history;
    }
}
