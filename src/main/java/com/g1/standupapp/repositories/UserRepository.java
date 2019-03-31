package com.g1.standupapp.repositories;

import java.util.List;
import java.util.Optional;

import com.g1.standupapp.models.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    @Override
    public List<User> findAll();

    public Optional<User> findById(Long userId);
    
    public Optional<User> findByUsername(String username);

    

}