package com.g1.standupapp.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "User")
public class User implements Comparable<User>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long userID;

    @Column(name = "email", unique = true, nullable = false)
    private String email;
        
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Team> teams = new HashSet<Team>();

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL
    )
    private Set<Invite> invites = new HashSet<Invite>();

    public User(){
        super();
    }

    public User(String email, String firstName, String lastName, Set<Team> teams, Set<Invite> invites){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.teams = teams;
        this.invites = invites;
    }
    
    public Long getUserID() {
        return this.userID;
    }

    public Set<Team> getTeams() {
        return this.teams;
    }

    public void setTeams(Set<Team> teams) {
        this.teams = teams;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Set<Invite> getInvites() {
        return this.invites;
    }

    public void setInvites(Set<Invite> invites) {
        this.invites = invites;
    }

	@Override
	public int compareTo(User user) {
        String name = lastName + ", " + firstName;
		return name.compareTo(user.getLastName() + ", " + user.getFirstName());
	}

}