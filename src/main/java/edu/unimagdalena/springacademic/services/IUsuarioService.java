package edu.unimagdalena.springacademic.services;

import edu.unimagdalena.springacademic.entities.Usuario;

/**
 * IUsuarioService
 */
public interface IUsuarioService {

  Usuario crearUsuario(String usuario, String rol, String clave);

  Usuario crearUsuario(String usuario, String rol);

  Usuario guardarUsuario(Usuario usuario);

  Usuario actualizarUsuario(Usuario usuario);

  void eliminarUsuario(Usuario usuario);

  Usuario getCurrentUsuario();

  Usuario getUsuarioByNombre(String usuario);

  Usuario getUsuarioByToken(String token);
}