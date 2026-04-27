package com.example.hospitalsystembackend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class DepartmentResponse {
    private Long id;
    private String name;
    private String type;
    private Long parentId;
    private int memberCount;
    private List<DepartmentResponse> children;
}
