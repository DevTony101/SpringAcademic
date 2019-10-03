package edu.unimagdalena.springacademic.controllers;

import java.util.Calendar;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.entities.ResponsableAlumno;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.AlumnoService;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * AlumnoController
 */
@Controller
public class AlumnoController {

  @Autowired
  private AlumnoService aService;

  @Autowired
  private UsuarioService uService;

  @GetMapping("/alumnado")
  public String alumnado(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    Alumno alumno = new Alumno();
    alumno.setResponsable(new ResponsableAlumno());
    model.addAttribute("alumno", alumno);
    model.addAttribute("usuario", usuario);
    return "alumnado";
  }

  @PostMapping("/crearAlumno")
  public String crearAlumno(@ModelAttribute @Valid Alumno alumno) {
    aService.guardarAlumno(alumno);
    return "redirect:/alumnado?success";
  }

  @GetMapping("/bajarAlumno/{id}")
  public String bajarAlumno(@PathVariable("id") Long id) {
    Alumno alumno = aService.getById(id);
    if (alumno.getFechaBaja() == null) {
      alumno.setFechaBaja(Calendar.getInstance().getTime());
    } else {
      alumno.setFechaBaja(null);
    }
    aService.actualizarAlumno(alumno);
    return "redirect:/alumnado";
  }

  @GetMapping("/getAlumnos")
  @ResponseBody
  public List<Alumno> getAlumnos() {
    // TODO: Agregar los demás parametros
    return aService.getAll();
  }

}