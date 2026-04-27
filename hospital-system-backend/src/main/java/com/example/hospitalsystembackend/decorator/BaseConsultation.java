package com.example.hospitalsystembackend.decorator;

public class BaseConsultation implements MedicalService {

    private final String patientName;

    public BaseConsultation(String patientName) {
        this.patientName = patientName;
    }

    @Override
    public String getDescription() {
        return "Consulta médica general para " + patientName;
    }

    @Override
    public double getPrice() {
        return 50.0;
    }

    @Override
    public String getServiceType() {
        return "BASE_CONSULTATION";
    }
}