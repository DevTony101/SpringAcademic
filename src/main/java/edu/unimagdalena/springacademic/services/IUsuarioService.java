package edu.unimagdalena.springacademic.services;

import edu.unimagdalena.springacademic.entities.Usuario;

/**
 * IUsuarioService
 */
public interface IUsuarioService {

  Usuario crearAdmin(String usuario);
}