package com.example.explorer.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.MysticLocation;
public interface IMysticLocation extends JpaRepository<MysticLocation, Integer> {

}
