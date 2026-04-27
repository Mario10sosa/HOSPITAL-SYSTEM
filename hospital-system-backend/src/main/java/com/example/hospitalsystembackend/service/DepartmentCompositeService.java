package com.example.hospitalsystembackend.service;

import com.example.hospitalsystembackend.composite.HospitalComponent;
import com.example.hospitalsystembackend.composite.HospitalGroup;
import com.example.hospitalsystembackend.composite.HospitalLeaf;
import com.example.hospitalsystembackend.dto.request.DepartmentRequest;
import com.example.hospitalsystembackend.dto.response.DepartmentResponse;
import com.example.hospitalsystembackend.model.Department;
import com.example.hospitalsystembackend.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentCompositeService {

    private final DepartmentRepository repository;

    public DepartmentResponse create(DepartmentRequest request) {
        Department dept = Department.builder()
                .name(request.getName())
                .type(request.getType().toUpperCase())
                .parentId(request.getParentId())
                .build();
        return toResponse(repository.save(dept));
    }

    public List<DepartmentResponse> getTree() {
        List<Department> roots = repository.findByParentIdIsNull();

        System.out.println("=== Árbol del Hospital ===");
        roots.forEach(root -> buildComposite(root).display(0));

        return roots.stream()
                .map(this::buildResponse)
                .collect(Collectors.toList());
    }

    public void delete(Long id) {
        repository.findByParentId(id)
                .forEach(child -> delete(child.getId()));
        repository.deleteById(id);
    }

    private HospitalComponent buildComposite(Department dept) {
        if ("LEAF".equalsIgnoreCase(dept.getType())) {
            return new HospitalLeaf(dept.getId(), dept.getName(), dept.getType());
        }

        HospitalGroup group = new HospitalGroup(dept.getId(), dept.getName(), dept.getType());
        repository.findByParentId(dept.getId())
                .forEach(child -> group.add(buildComposite(child)));
        return group;
    }

    private DepartmentResponse buildResponse(Department dept) {
        List<DepartmentResponse> children = repository
                .findByParentId(dept.getId())
                .stream()
                .map(this::buildResponse)
                .collect(Collectors.toList());

        HospitalComponent composite = buildComposite(dept);

        return DepartmentResponse.builder()
                .id(dept.getId())
                .name(dept.getName())
                .type(dept.getType())
                .parentId(dept.getParentId())
                .memberCount(composite.getMemberCount())
                .children(children)
                .build();
    }

    private DepartmentResponse toResponse(Department dept) {
        return DepartmentResponse.builder()
                .id(dept.getId())
                .name(dept.getName())
                .type(dept.getType())
                .parentId(dept.getParentId())
                .memberCount(0)
                .children(List.of())
                .build();
    }
}
