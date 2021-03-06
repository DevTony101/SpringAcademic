package edu.unimagdalena.springacademic.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.entities.Asignatura;
import edu.unimagdalena.springacademic.entities.Clase;
import edu.unimagdalena.springacademic.entities.Curso;
import edu.unimagdalena.springacademic.entities.HoraSemanal;
import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.repositories.ClaseRepository;

/**
 * ClaseService
 */
@Service
public class ClaseService implements IClaseService {

  @Autowired
  private AsignaturaService aService;

  @Autowired
  private AlumnoService alService;

  @Autowired
  private ProfesorService pService;

  @Autowired
  private HoraSemanalService hService;

  @Autowired
  private ClaseRepository cRepo;

  private Logger LOG = Logger.getLogger(ClaseService.class);

  @Override
  public List<Clase> getAll() {
    return cRepo.findAll();
  }

  @Override
  public Clase guardarClase(Clase clase) {
    Asignatura asignatura = clase.getAsignatura();
    asignatura.getClases().add(clase);
    clase.setAsignatura(asignatura);
    aService.actualizarAsignatura(asignatura);

    Clase aux = verificarClase(asignatura.getCurso(), asignatura);
    if (aux == null) {
      Profesor profesor = clase.getProfesor();
      profesor = pService.getProfesorByNif(profesor.getNif());
      profesor.getClases().add(clase);
      clase.setProfesor(profesor);
      pService.actualizarProfesor(profesor);

      // Creacion y guardado de las horas semanales
      Set<HoraSemanal> horario = new HashSet<>(clase.getHorasSemanales());
      clase.getHorasSemanales().clear();
      horario.forEach(hora -> {
        HoraSemanal hSem = hService.getByIndice(hora.getDiaIndice(), hora.getHoraIndice());
        if (hSem == null) {
          hora.getClases().add(clase);
          hService.guardarHora(hora);
          clase.getHorasSemanales().add(hora);
        } else {
          hSem.getClases().add(clase);
          hService.guardarHora(hSem);
          clase.getHorasSemanales().add(hSem);
        }
      });

      Curso curso = asignatura.getCurso();
      List<Alumno> alumnos = alService.getAlumnosByCurso(curso);
      LOG.info(alumnos.toString());

      alumnos.forEach(alumno -> {
        alumno.setNCurso(UUID.randomUUID().toString());
        alumno.getClases().add(clase);
        clase.getAlumnos().add(alumno);
      });

      return cRepo.save(clase);
    } else {
      clase.setId(aux.getId());
      Set<HoraSemanal> horario = new HashSet<>(aux.getHorasSemanales());
      horario.addAll(clase.getHorasSemanales());
      clase.setHorasSemanales(new HashSet<>(horario));
      return actualizarClase(clase);
    }
  }

  @Override
  public Clase actualizarClase(Clase clase) {
    Set<HoraSemanal> horario = new HashSet<>(clase.getHorasSemanales());
    clase.getHorasSemanales().clear();
    horario.forEach(hora -> {
      HoraSemanal hSem = hService.getByIndice(hora.getDiaIndice(), hora.getHoraIndice());
      if (hSem == null) {
        hora.getClases().add(clase);
        hService.guardarHora(hora);
        clase.getHorasSemanales().add(hora);
      } else {
        hSem.getClases().add(clase);
        hService.guardarHora(hSem);
        clase.getHorasSemanales().add(hSem);
      }
    });

    return cRepo.save(clase);
  }

  @Override
  public void eliminarClase(Long id) {
    cRepo.deleteById(id);
  }

  @Override
  public Clase getById(Long id) {
    Optional<Clase> clase = cRepo.findById(id);
    return (clase.isPresent() ? clase.get() : null);
  }

  @Override
  public List<Clase> getByCurso(Integer nivel, String etapa) {
    return cRepo.findByCurso(nivel, etapa);
  }

  @Override
  public List<Clase> getByAsignatura(String asignatura) {
    return cRepo.findByAsignatura(asignatura);
  }

  @Override
  public List<Clase> getByProfesor(String nif) {
    return cRepo.findByProfesor(nif);
  }

  public Clase verificarClase(Curso curso, Asignatura asignatura) {
    // Funcion que verifica si existe una clase dada una asignatura
    // Y un curso dado
    Clase clase = null;
    List<Clase> clases = getByCurso(curso.getNivel(), curso.getEtapa());
    for (Clase c : clases) {
      if (c.getAsignatura().getNombre().equals(asignatura.getNombre())) {
        clase = c;
        break;
      }
    }

    return clase;
  }

}