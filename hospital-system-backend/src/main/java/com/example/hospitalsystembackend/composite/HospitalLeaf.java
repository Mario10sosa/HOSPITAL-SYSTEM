package com.example.hospitalsystembackend.composite;

import lombok.Getter;
import java.util.Collections;
import java.util.List;

@Getter
public class HospitalLeaf implements HospitalComponent {

    private final Long id;
    private final String name;
    private final String type;

    public HospitalLeaf(Long id, String name, String type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    @Override
    public int getMemberCount() {
        return 1;
    }

    @Override
    public List<HospitalComponent> getChildren() {
        return Collections.emptyList();
    }

    @Override
    public void display(int depth) {
        System.out.println("  ".repeat(depth) + "👤 [" + type + "] " + name);
    }
}
