package edu.unimagdalena.springacademic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.HoraSemanal;
import edu.unimagdalena.springacademic.repositories.HoraSemanalRepository;

/**
 * HoraSemanalService
 */
@Service
public class HoraSemanalService implements IHoraSemanalService {

  @Autowired
  private HoraSemanalRepository hRepo;

  @Override
  public HoraSemanal getByIndice(Integer dia, Integer hora) {
    return hRepo.findByIndice(dia, hora);
  }

  @Override
  public HoraSemanal guardarHora(HoraSemanal hora) {
    return hRepo.save(hora);
  }

}