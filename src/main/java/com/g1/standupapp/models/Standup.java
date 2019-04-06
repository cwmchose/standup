package com.g1.standupapp.models;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name ="Standup", uniqueConstraints = {@UniqueConstraint(columnNames = {"date","team_id"})})
public class Standup{

    @Id
    @Column(name = "standup_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long standupID;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "date", nullable = false)
    private Date date;

    @OneToMany(
        mappedBy = "standup",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    Set<StandupEntry> standups;
	public void setStandupID(Long standupID) {
        this.standupID = standupID;
    }
    
    //Getters and Setters

    public Long getStandupID() {
        return this.standupID;
    }

    public Set<StandupEntry> getStandups() {
        return this.standups;
    }

    public void setStandups(Set<StandupEntry> standups) {
        this.standups = standups;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
}