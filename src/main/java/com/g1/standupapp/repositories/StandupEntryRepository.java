package com.g1.standupapp.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.g1.standupapp.models.StandupEntry;

import org.springframework.data.repository.CrudRepository;

public interface StandupEntryRepository extends CrudRepository<StandupEntry,Long>{
    
    @Override
    public List<StandupEntry> findAll();

    public Optional<StandupEntry> findById(Long standupEntryID);

    public Optional<StandupEntry> findByDateAndTeam_TeamNameAndUser_Email(Date Date, String teamName, String email );
    
    public List<StandupEntry> findByDateAndTeam_TeamName(Date Date, String teamName);
}