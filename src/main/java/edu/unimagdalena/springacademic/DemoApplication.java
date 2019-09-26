package edu.unimagdalena.springacademic;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import edu.unimagdalena.springacademic.services.RoleService;

@SpringBootApplication
public class DemoApplication {

	@Autowired
	private RoleService service;

	public static void main(String... args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@PostConstruct
	public void crearRoles() {
		service.crearRoles("ADMIN", "ALUMNO", "PROFESOR");
	}
}