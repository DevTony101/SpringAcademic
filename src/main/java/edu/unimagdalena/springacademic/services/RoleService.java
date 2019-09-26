package edu.unimagdalena.springacademic.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Role;
import edu.unimagdalena.springacademic.repositories.RoleRepository;

/**
 * RoleService
 */
@Service
public class RoleService implements IRoleService {

  @Autowired
  private RoleRepository repo;

  @Override
  public void crearRoles(String... roles) {
    List<String> lista = Arrays.asList(roles);
    lista.forEach(rol -> {
      Role role = new Role();
      role.setRole(rol);
      if (repo.findByRole(rol) == null) {
        repo.save(role);
      }
    });
  }

}