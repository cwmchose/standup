package com.g1.standupapp.models;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name ="Standup_Entry")
public class StandupEntry{

    @Id
    @Column(name = "standup_entry_id", nullable = false)
    private Integer standupEntryID;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "date", nullable = false)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "data")
    private byte[] data;

    //Getters and Setters

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