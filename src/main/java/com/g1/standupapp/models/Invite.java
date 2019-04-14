// package com.g1.standupapp.models;

// import java.time.LocalDate;

// import javax.persistence.*;

// @Entity
// @Table(name = "Invite")
// public class Invite implements Comparable<User>{

//     @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     @Column(name = "invite_id")
//     private Long inviteID;
        
//     @Column(name = "team_name", nullable = false)
//     private String teamName;

//     @Column(name = "date", nullable = false)
//     private LocalDate date;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "user_id")
    // @JsonBackReference(value="userReference")
    // private User user;


//     public Long getInviteID() {
//         return this.inviteID;
//     }

//     public String getTeamName() {
//         return this.teamName;
//     }

//     public void setTeamName(String teamName) {
//         this.teamName = teamName;
//     }

//     public LocalDate getDate() {
//         return this.date;
//     }

//     public void setDate(LocalDate date) {
//         this.date = date;
//     }

//     @Override
//     public int compareTo(User o) {
//         return 0;
//     }

// }