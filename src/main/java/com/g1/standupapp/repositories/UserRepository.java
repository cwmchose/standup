package com.g1.standupapp.repositories;

import com.g1.standupapp.models.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

}