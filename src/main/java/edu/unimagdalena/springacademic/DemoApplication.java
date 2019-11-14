package edu.unimagdalena.springacademic;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.RoleService;
import edu.unimagdalena.springacademic.services.UsuarioService;

@SpringBootApplication
public class DemoApplication {

	@Autowired
	private RoleService rService;

	@Autowired
	private UsuarioService uService;

	public static void main(String... args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@PostConstruct
	public void inicializar() {
		rService.crearRoles("ADMIN", "ALUMNO", "PROFESOR");
		Usuario usuario = uService.crearUsuario("admin", "ADMIN", "300710");
		uService.guardarUsuario(usuario);
	}
}