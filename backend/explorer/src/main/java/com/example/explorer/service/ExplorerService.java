package com.example.explorer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.ExplorerDTO;
import com.example.explorer.model.Explorer;
import com.example.explorer.repository.IExplorer;

@Service
public class ExplorerService {

    @Autowired
    private IExplorer repository;

    public void save(ExplorerDTO explorerDTO) {
        Explorer explorer = convertToModel(explorerDTO);
        repository.save(explorer);
    }

    public Explorer convertToModel(ExplorerDTO explorerDTO) {
        return new Explorer(
                explorerDTO.getId(),
                explorerDTO.getName(),
                explorerDTO.getNationality(),
                explorerDTO.getAge(),
                explorerDTO.getReputation()
        );
    }

    public ExplorerDTO convertToDTO(Explorer explorer) {
        return new ExplorerDTO(
                explorer.getId_explorer(),
                explorer.getName(),
                explorer.getNationality(),
                explorer.getAge(),
                explorer.getReputation()
        );
    }
}
