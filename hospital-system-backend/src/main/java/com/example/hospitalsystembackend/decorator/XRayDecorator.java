package com.example.hospitalsystembackend.decorator;

public class XRayDecorator extends MedicalServiceDecorator {

    public XRayDecorator(MedicalService wrapped) {
        super(wrapped);
    }

    @Override
    public String getDescription() {
        return wrapped.getDescription() + " + Rayos X";
    }

    @Override
    public double getPrice() {
        return wrapped.getPrice() + 60.0;
    }

    @Override
    public String getServiceType() {
        return "XRAY";
    }
}