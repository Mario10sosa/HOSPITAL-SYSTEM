package com.example.hospitalsystembackend.composite;

import lombok.Getter;
import java.util.ArrayList;
import java.util.List;

@Getter
public class HospitalGroup implements HospitalComponent {

    private final Long id;
    private final String name;
    private final String type;
    private final List<HospitalComponent> children = new ArrayList<>();

    public HospitalGroup(Long id, String name, String type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public void add(HospitalComponent component) {
        children.add(component);
    }

    public void remove(HospitalComponent component) {
        children.remove(component);
    }

    @Override
    public int getMemberCount() {
        return children.stream()
                .mapToInt(HospitalComponent::getMemberCount)
                .sum();
    }

    @Override
    public List<HospitalComponent> getChildren() {
        return children;
    }

    @Override
    public void display(int depth) {
        System.out.println("  ".repeat(depth)
                + "📁 [" + type + "] " + name
                + " (" + getMemberCount() + " miembros)");
        children.forEach(c -> c.display(depth + 1));
    }
}
