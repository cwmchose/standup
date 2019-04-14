package com.g1.standupapp.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.g1.standupapp.models.Invite;

import org.springframework.data.repository.CrudRepository;

public interface InviteRepository extends CrudRepository<Invite, Long> {

    @Override
    public List<Invite> findAll();

    public Optional<Invite> findById(Long inviteID);

    public Optional<Invite> findByUser_UserIDAndTeamName(Long userID, String teamName);
    
}