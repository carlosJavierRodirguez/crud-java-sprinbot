package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Meeting;

public interface IMeeting extends JpaRepository<Meeting, Integer> {

    /*
     * Lista todos los datos de la tabla meeting
     * y hacer un join con los exploradores y las criaturas segun el id
     */
    @Query("SELECT m FROM meeting m INNER JOIN m.explorer e INNER JOIN m.creature c WHERE e.status = true AND c.status = true")
    List<Meeting> getListMeeting();

    // filtra los datos por nombre del explorador
    @Query("SELECT m FROM meeting m " +
            "INNER JOIN m.explorer e " +
            "INNER JOIN m.creature c " +
            "WHERE LOWER(e.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<Meeting> filterForNameExplorer(String filter);

}
