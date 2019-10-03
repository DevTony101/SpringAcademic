package edu.unimagdalena.springacademic.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.entities.ResponsableAlumno;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.repositories.AlumnoRepository;

/**
 * AlumnoService
 */
@Service
public class AlumnoService implements IAlumnoService {

  @Autowired
  private AlumnoRepository repo;

  @Autowired
  private UsuarioService uService;

  @Autowired
  private ResponsableService rService;

  @Override
  public Alumno guardarAlumno(Alumno alumno) {
    String nombre = alumno.getNombre().toLowerCase() + alumno.getApellido().substring(0, 2).toLowerCase();
    Usuario usuario = uService.crearUsuario(nombre, "ALUMNO");
    ResponsableAlumno responsable = alumno.getResponsable();
    if (responsable.getNombre().isEmpty()) {
      alumno.setResponsable(null);
    } else {
      responsable.getAlumnos().add(alumno);
      rService.guardarResponsable(responsable);
    }
    usuario.setUsuarioAlumno(alumno);
    uService.guardarUsuario(usuario);
    return repo.save(alumno);
  }

  @Override
  public Alumno actualizarAlumno(Alumno alumno) {
    return repo.save(alumno);
  }

  @Override
  public List<Alumno> getAll() {
    return repo.findAll();
  }

  @Override
  public Alumno getById(Long id) {
    return repo.getOne(id);
  }

}