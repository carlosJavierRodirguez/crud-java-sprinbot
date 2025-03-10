package com.example.explorer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.Artifacts;

public interface IArtifacts extends JpaRepository<Artifacts, Integer> {

}
