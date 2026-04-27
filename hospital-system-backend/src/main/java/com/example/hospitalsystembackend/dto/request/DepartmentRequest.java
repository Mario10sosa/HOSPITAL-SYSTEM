package com.example.hospitalsystembackend.dto.request;

import lombok.Data;

@Data
public class DepartmentRequest {
    private String name;
    private String type;
    private Long parentId;
}
