package com.example.hospitalsystembackend.decorator;

public abstract class MedicalServiceDecorator implements MedicalService {

    protected final MedicalService wrapped;

    public MedicalServiceDecorator(MedicalService wrapped) {
        this.wrapped = wrapped;
    }

    @Override
    public String getDescription() {
        return wrapped.getDescription();
    }

    @Override
    public double getPrice() {
        return wrapped.getPrice();
    }

    @Override
    public String getServiceType() {
        return wrapped.getServiceType();
    }
}