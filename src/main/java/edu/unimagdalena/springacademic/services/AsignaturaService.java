package edu.unimagdalena.springacademic.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Asignatura;
import edu.unimagdalena.springacademic.entities.Curso;
import edu.unimagdalena.springacademic.repositories.AsignaturaRepository;

/**
 * AsignaturaService
 */
@Service
public class AsignaturaService implements IAsignaturaService {

  @Autowired
  private AsignaturaRepository repo;

  @Autowired
  private CursoService cService;

  @Override
  public Asignatura guardarAsignatura(Asignatura asignatura) {
    String nCurso = asignatura.getNCurso();
    int nivel = Integer.parseInt(nCurso.substring(0, 1));
    String etapa = nCurso.substring(4, nCurso.length());
    Curso curso = cService.getByNivelEtapa(nivel, etapa);
    curso.getAsignaturas().add(asignatura);
    cService.guardarCurso(curso);
    asignatura.setCurso(curso);
    return repo.save(asignatura);
  }

  @Override
  public Asignatura actualizarAsignatura(Asignatura asignatura) {
    return repo.save(asignatura);
  }

  @Override
  public List<Asignatura> getAll() {
    return repo.findAll();
  }

  @Override
  public Asignatura getByNombre(String nombre) {
    return repo.findByNombre(nombre);
  }

  @Override
  public List<Asignatura> getByCurso(Curso curso) {
    return repo.findByCurso(curso);
  }

}