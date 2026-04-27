package com.example.hospitalsystembackend.repository;

import com.example.hospitalsystembackend.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    List<Department> findByParentIdIsNull();

    List<Department> findByParentId(Long parentId);
}
