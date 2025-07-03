package com.example.explorer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.Page;

public interface IPage extends JpaRepository<Page, Integer> {

}
