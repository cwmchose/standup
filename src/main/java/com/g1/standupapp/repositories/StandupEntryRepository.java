package com.g1.standupapp.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.g1.standupapp.models.StandupEntry;

import org.springframework.data.repository.CrudRepository;

public interface StandupEntryRepository extends CrudRepository<StandupEntry,Long>{

    @Override
    public List<StandupEntry> findAll();

    public Optional<StandupEntry> findById(Long standupEntryID);

    public Optional<StandupEntry> findByDateAndTeam_TeamNameAndUser_Email(LocalDate Date, String teamName, String email );
    
    public List<StandupEntry> findByDateAndTeam_TeamName(LocalDate Date, String teamName);

    public List<StandupEntry> findByDateAndUser_Email(LocalDate date , String email);

    public List<StandupEntry> findByUser_UserID(Long userID);
}