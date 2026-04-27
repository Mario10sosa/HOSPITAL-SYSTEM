package com.example.hospitalsystembackend.decorator;

public class InsuranceDecorator extends MedicalServiceDecorator {

    public InsuranceDecorator(MedicalService wrapped) {
        super(wrapped);
    }

    @Override
    public String getDescription() {
        return wrapped.getDescription() + " + Cobertura de seguro médico";
    }

    @Override
    public double getPrice() {
        return wrapped.getPrice() + 50.0;
    }

    @Override
    public String getServiceType() {
        return "INSURANCE";
    }
}