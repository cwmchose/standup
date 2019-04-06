package com.g1.standupapp.models;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name ="Standup_Entry", uniqueConstraints = {@UniqueConstraint(columnNames = {"date","team_id","user_id"})})
public class StandupEntry{

    @Id
    @Column(name = "standup_entry_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long standupEntryID;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "date", nullable = false)
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "standup_id")
    private Standup standup;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "data")
    private byte[] data;

    //Getters and Setters

	public void setStandupEntryID(Long standupEntryID) {
        this.standupEntryID = standupEntryID;
    }

    public Standup getStandup() {
        return this.standup;
    }

    public void setStandup(Standup standup) {
        this.standup = standup;
    }

    public Long getStandupEntryID() {
        return this.standupEntryID;
    }

    public Team getTeam() {
        return team;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
    
}