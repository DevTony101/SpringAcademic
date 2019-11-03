let table;
let editMode = false;

function setup() {
  noCanvas();
  initTable();
  initValidations();
  initForm();
  initSelects();
  $('#successModal').modal('toggle');
  $('#btnBuscar').on('click', (e) => {
    e.preventDefault();
    getResultados();
  });

  $('#btnNuevoProfesor').on('click', (e) => {
    e.preventDefault();
    resetSM(select('#smNif'));
    resetSM(select('#smCorreo'));
    select('#itNombre').value('');
    select('#itApellido').value('');
    select('#itNif').value('');
    $('#itNif').attr('readonly', false);
    select('#itTelefono').value('');
    select('#itCorreo').value('');
    select('#itTitulacion').value('');

    select('#mdcrear-title').html('Nuevo Profesor');
    $('#btnCrear').html('Crear');
    $('#btnLimpiar').css('display', 'block');
    $('#mdCrearProfesor').modal('toggle');
    editMode = false;
  });

  $('#mdCrearProfesor').on('hidden.bs.modal', () => {
    editMode = false;
  });
}

function initForm() {
  $('#formProfesor').on('submit', () => {
    if (select('#smNif').hasClass('show-error')) {
      return false;
    }

    if (select('#smCorreo').hasClass('show-error')) {
      return false;
    }

    if (editMode) {
      const profesor = {
        id: select('#auxId').value(),
        nombre: select('#itNombre').value(),
        apellido: select('#itApellido').value(),
        nif: select('#itNif').value(),
        telefono: select('#itTelefono').value(),
        correo: select('#itCorreo').value(),
        titulacion: select('#itTitulacion').value()
      };

      $.ajax("/profesores", {
        contentType: "application/json",
        dataType: 'json',
        type: 'PUT',
        data: JSON.stringify(profesor),
        success: function (data) {
          $('#mdCrearProfesor').modal('toggle');
          getResultados();
        }
      });

      select('#auxId').value('');
      editMode = false;
      return false;
    }

    return true;
  });
}

function initValidations() {
  const itNif = select('#itNif');
  const smNif = select('#smNif');
  const itCorreo = select('#itCorreo');
  const smCorreo = select('#smCorreo');

  itNif.input(() => {
    const nif = itNif.value();
    resetSM(smNif);
    if (!editMode) {
      const data = getData('/profesores');
      data.then(json => {
        json.forEach(profesor => {
          if (nif === profesor.nif) {
            smNif.removeClass('hidden');
            smNif.addClass('show-error');
          }
        });
      });
    }
  });

  itCorreo.input(() => {
    const correo = itCorreo.value();
    resetSM(smCorreo);
    if (!editMode) {
      const data = getData('/profesores');
      data.then(json => {
        json.forEach(profesor => {
          if (correo === profesor.correo) {
            smCorreo.removeClass('hidden');
            smCorreo.addClass('show-error');
          }
        });
      });
    }
  });
}

function initSelects() {
  loadAsignaturas();
  loadTitulaciones();
}

function loadAsignaturas() {
  const slAsignaturas = select('#slAsignatura');
  const data = getData('/asignaturas');
  slAsignaturas.option('Todos');
  data.then(json => {
    json.forEach(asignatura => {
      slAsignaturas.option(asignatura.nombre);
    });
  });
}

function loadTitulaciones() {
  const slTitulaciones = select('#slTitulaciones');
  const data = getData('/profesores');
  slTitulaciones.option('Todos');
  data.then(json => {
    json.forEach(profesor => {
      slTitulaciones.option(profesor.titulacion);
    });
  });
}

function initTable() {
  const btnTabla = "<div class='btn-group' style='margin: 0'>" +
    "<button class='btn bmd-btn-icon dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
    "<i class='material-icons'>more_vert</i>" +
    "</button>" +
    "<div class='dropdown-menu dropdown-menu-left'>" +
    "<a class='dropdown-item btn btn-primary' role='button' href='#'>Datos Personales</a>" +
    "<a class='dropdown-item btn btn-primary' role='button' href='#'>Clases</a>" +
    "<a class='dropdown-item btn btn-danger' role='button' href='#'>Eliminar</a>" +
    "</div>" +
    "</div>";

  table = $('#tbBusqueda').DataTable({
    "columnDefs": [{
      "data": null,
      "defaultContent": btnTabla,
      "targets": -1
    }]
  });

  $('#tbBusqueda tbody').on('click', 'a', function (e) {
    e.preventDefault();
    const data = table.row($(this).parents('tr')).data();
    const nombre = data[0];
    const nif = data[1];
    const action = $(this).text();
    const Http = new XMLHttpRequest();
    let url, res;
    switch (action) {
      case "Datos Personales":
        editInfo(nif);
        break;
      case "Clases":
        $('#modalClases').modal('toggle');
        const timetable = new Timetable();
        timetable.setScope(9, 21); // optional, only whole hours between 0 and 23
        timetable.addLocations(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']);
        url = '/clases?profesor=' + nombre;
        getData(encodeURI(url)).then(json => {
          json.forEach(clase => {
            let asignatura = clase.asignatura.nombre;
            asignatura += ' - ' + clase.asignatura.curso.nivel + clase.asignatura.curso.etapa.substring(0, 1);
            const horasSemanales = clase.horasSemanales;
            horasSemanales.forEach(horario => {
              const dia = horario.dia;
              let hora = horario.hora.split(":")[0];
              hora = Number(hora);
              console.log(dia);
              timetable.addEvent(asignatura, dia, new Date(2019, 10, 20, hora, 0), new Date(2019, 10, 20, (hora + 1), 0));
            });
          });
          const renderer = new Timetable.Renderer(timetable);
          renderer.draw('.timetable'); // any css selector
        });
        break;
      case "Eliminar":
        url = "/profesor/" + nif;
        res = encodeURI(url);
        Http.open("DELETE", res);
        Http.send();
        setTimeout(getResultados, 500);
        break;
    }
  });
}

function getResultados() {
  const nombre = select('#searchName').value();
  const nif = select('#searchNif').value();
  const url = '/profesores';
  let query = '';
  let res;
  if (nombre.length > 0 && nif.length > 0) {
    query = '?nombre=' + nombre + '&nif=' + nif;
  } else if (nombre.length > 0) {
    query = '?nombre=' + nombre;
  } else if (nif.length > 0) {
    query = '?nif=' + nif;
  }
  res = encodeURI(url + query);
  const data = getData(res);
  table.clear().draw();
  data.then(json => {
    json.forEach(profesor => {
      table.row.add([
        profesor.nombre,
        profesor.nif,
        profesor.correo,
        profesor.telefono
      ]).draw(false);
    });
  });
}

function editInfo(nif) {
  const data = getData(encodeURI('/profesores?nif=' + nif));
  $('#btnCrear').html('Modificar');
  $('#btnLimpiar').css('display', 'none');
  resetSM(select('#smNif'));
  resetSM(select('#smCorreo'));
  data.then(json => {
    const profesor = json[0];
    select('#auxId').value(profesor.id);
    select('#itNombre').value(profesor.nombre);
    select('#itApellido').value(profesor.apellido);
    select('#itNif').value(profesor.nif);
    $('#itNif').attr('readonly', true);
    select('#itTelefono').value(profesor.telefono);
    select('#itCorreo').value(profesor.correo);
    if (profesor.titulacion) {
      select('#itTitulacion').value(profesor.titulacion);
    }

    select('#mdcrear-title').html('Editar Profesor');
    $('#mdCrearProfesor').modal('toggle');
    editMode = true;
  });
}

function resetSM(sm) {
  sm.removeClass('show-error');
  sm.addClass('hidden');
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  return data;
}