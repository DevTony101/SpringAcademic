package edu.unimagdalena.springacademic.services;

import edu.unimagdalena.springacademic.entities.HoraSemanal;

/**
 * IHoraSemanal
 */
public interface IHoraSemanalService {

  HoraSemanal getByIndice(Integer dia, Integer hora);
  HoraSemanal guardarHora(HoraSemanal hora);
}