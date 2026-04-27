package com.example.hospitalsystembackend.composite;

import java.util.List;

public interface HospitalComponent {
    String getName();

    String getType();

    int getMemberCount();

    void display(int depth);

    List<HospitalComponent> getChildren();
}
