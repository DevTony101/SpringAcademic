package edu.unimagdalena.springacademic.controllers;

import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.ProfesorService;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * ProfesorController
 */
@Controller
public class ProfesorController {

  @Autowired
  private ProfesorService pService;

  @Autowired
  private UsuarioService uService;

  @GetMapping("/profesorado")
  public String profesorado(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    model.addAttribute("profesor", new Profesor());
    model.addAttribute("usuario", usuario);
    return "profesorado";
  }

  @PostMapping("/crearProfesor")
  public String crearProfesor(@ModelAttribute @Valid Profesor profesor) {
    pService.guardarProfesor(profesor);
    return "redirect:/profesorado?success";
  }

  @GetMapping("/getProfesores")
  @ResponseBody
  public List<Profesor> getProfesores(@RequestParam(name = "nombre", required = false) String nombre,
      @RequestParam(name = "nif", required = false) String nif) {

    if (nombre != null && nif != null) {
      return Arrays.asList(pService.getProfesor(nombre, nif));
    }

    if (nombre != null) {
      return pService.getProfesorByNombre(nombre);
    }

    if (nif != null) {
      return Arrays.asList(pService.getProfesorByNif(nif));
    }

    return pService.getAll();
  }

  @GetMapping("/eliminarProfesor/{nif}")
  public String eliminarProfesor(@PathVariable("nif") String nif, Model model) {
    Profesor profesor = pService.getProfesorByNif(nif);
    pService.eliminarProfesor(profesor);
    model.addAttribute("profesor", new Profesor());
    return "busquedaProfesorado";
  }

}