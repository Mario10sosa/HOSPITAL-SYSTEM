package com.example.hospitalsystembackend.decorator;

public class LabTestDecorator extends MedicalServiceDecorator {

    public LabTestDecorator(MedicalService wrapped) {
        super(wrapped);
    }

    @Override
    public String getDescription() {
        return wrapped.getDescription() + " + Exámenes de laboratorio";
    }

    @Override
    public double getPrice() {
        return wrapped.getPrice() + 80.0;
    }

    @Override
    public String getServiceType() {
        return "LAB_TEST";
    }
}