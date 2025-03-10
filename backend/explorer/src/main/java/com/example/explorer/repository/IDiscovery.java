package com.example.explorer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.Discovery;

public interface IDiscovery extends JpaRepository<Discovery, Integer> {

}
