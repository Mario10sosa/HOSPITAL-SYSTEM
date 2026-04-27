package com.example.hospitalsystembackend.decorator;

public class MedicationDecorator extends MedicalServiceDecorator {

    public MedicationDecorator(MedicalService wrapped) {
        super(wrapped);
    }

    @Override
    public String getDescription() {
        return wrapped.getDescription() + " + Medicamentos recetados";
    }

    @Override
    public double getPrice() {
        return wrapped.getPrice() + 30.0;
    }

    @Override
    public String getServiceType() {
        return "MEDICATION";
    }
}