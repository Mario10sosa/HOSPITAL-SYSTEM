package com.example.hospitalsystembackend;

import com.example.hospitalsystembackend.adapter.LabSystem;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class HospitalSystemBackendApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(HospitalSystemBackendApplication.class, args);

		// Prueba rápida del Adapter
		LabSystem lab = ctx.getBean(LabSystem.class);
		String examId = lab.requestExam(1L, "BLOOD_TEST");
		System.out.println("Resultado: " + lab.getExamResult(examId));
	}

}
