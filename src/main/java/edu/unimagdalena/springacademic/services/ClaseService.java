package edu.unimagdalena.springacademic.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Asignatura;
import edu.unimagdalena.springacademic.entities.Clase;
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
  private ProfesorService pService;

  @Autowired
  private HoraSemanalService hService;

  @Autowired
  private ClaseRepository cRepo;

  @Override
  public List<Clase> getAll() {
    return cRepo.findAll();
  }

  @Override
  public Clase guardarClase(Clase clase) {
    Asignatura asignatura = clase.getAsignatura();
    asignatura = aService.getByNombre(asignatura.getNombre());
    asignatura.getClases().add(clase);
    clase.setAsignatura(asignatura);
    Profesor profesor = clase.getProfesor();
    profesor = pService.getProfesorByNif(profesor.getNif());
    profesor.getClases().add(clase);
    clase.setProfesor(profesor);

    // Creacion y guardado de las horas semanales
    Set<HoraSemanal> horario = new HashSet<>(clase.getHorasSemanales());
    clase.getHorasSemanales().clear();
    horario.forEach(hora -> {
      HoraSemanal hSem = hService.getByIndice(hora.getDiaIndice(), hora.getHoraIndice());
      if(hSem == null) {
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

}