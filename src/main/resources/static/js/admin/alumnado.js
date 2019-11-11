let table;
let editMode = false;

function setup() {
  noCanvas();
  initTable();
  initForm();
  initRespForm();
  loadAsignaturas();
  $('#successModal').modal('toggle');
  $('#btnBuscar').on('click', () => {
    getResultados();
  });

  $('#formAlumno').on('submit', () => {

    if (String(select('#itRespCorreo').value()).length > 0) {
      if (!validateEmail(select('#itRespCorreo').value())) {
        $('#itRespCorreo').popover('show');
        return false;
      }
    }

    if (editMode) {
      const responsable = {
        id: select('#auxIdResp').value(),
        nombre: select('#itRespNombre').value(),
        apellido: select('#itRespApellido').value(),
        nif: select('#itRespNif').value(),
        telefono: select('#itRespTelefono').value(),
        correo: select('#itRespCorreo').value()
      };

      const alumno = {
        id: select('#auxId').value(),
        nombre: select('#itNombre').value(),
        apellido: select('#itApellido').value(),
        nif: select('#itNif').value(),
        telefono: select('#itTelefono').value(),
        correo: select('#itCorreo').value(),
        repetidor: select('#cbRepetidor').value(),
        fechaAlta: select('#itfalta').value(),
        observaciones: select('#taObservaciones').value(),
        responsable: responsable
      };

      console.log(alumno.nCurso);

      $.ajax("/alumnos", {
        contentType: "application/json",
        dataType: 'json',
        type: 'PUT',
        data: JSON.stringify(alumno),
        success: function (data) {
          $('#mdCrearAlumno').modal('toggle');
          getResultados();
        }
      });

      select('#auxId').value('');
      select('#auxIdResp').value('');
      editMode = false;
      return false;
    } else if (String(select('#itCorreo').value()).length > 0) {
      if (!validateEmail(select('#itCorreo').value())) {
        $('#itCorreo').popover('show');
        return false;
      }
    }

    return true;
  });

  $('#btnNuevoAlumno').on('click', (e) => {
    e.preventDefault();
    select('#itNombre').value('');
    select('#itApellido').value('');
    select('#itNif').value('');
    $('#itNif').attr('readonly', false);
    select('#itTelefono').value('');
    select('#itCorreo').value('');
    $('#cbRepetidor').attr('checked', false);
    select('#taObservaciones').value('');
    cleanRespForm();
    initForm();

    $('#itCorreo').popover('hide');
    $('#itRespCorreo').popover('hide');
    select('#mdcrear-title').html('Nuevo Alumno');
    $('#btnCrear').html('Crear');
    $('#mdCrearAlumno').modal('toggle');
    editMode = false;
  });

  $('#mdCrearAlumno').on('hidden.bs.modal', () => {
    editMode = false;
  });
}

function loadAsignaturas() {
  const slAsignaturas = select('#slAsignaturas');
  const data = getData('/asignaturas');
  slAsignaturas.option('Todos');
  data.then(json => {
    json.forEach(asignatura => {
      slAsignaturas.option(asignatura.nombre);
    });
  });
}

function initForm() {
  $('#itfalta').val(new Date().toISOString().substring(0, 10));
  loadCursos();
}

function loadCursos() {
  $('#itCurso option').remove();
  $('#slCursos option').remove();
  const itCurso = select('#itCurso');
  const slCurso = select('#slCursos');
  $('#itCurso').attr('disabled', false);
  const data = getData('/cursos');
  data.then(json => {
    json.forEach(curso => {
      console.log(curso);
      itCurso.option(curso.nivel + ' - ' + curso.etapa);
      slCurso.option(curso.nivel + ' - ' + curso.etapa);
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
    "<a class='dropdown-item btn btn-danger' role='button' href='#'>Dar de alta/baja</a>" +
    "</div>" +
    "</div>";

  table = $('#tbBusqueda').DataTable({
    "columnDefs": [{
      "data": null,
      "defaultContent": btnTabla,
      "targets": -1
    }],
    "rowCallback": function (row, data) {
      if (data[5] !== 'No Figura') {
        // Vector - Posicion de fecha baja
        $('td', row).addClass("table-danger");
      }
    }
  });

  $('#tbBusqueda tbody').on('click', 'a', function (e) {
    e.preventDefault();
    const data = table.row($(this).parents('tr')).data();
    const id = data[0];
    const action = $(this).text();
    const Http = new XMLHttpRequest();
    let url, res;
    switch (action) {
      case "Datos Personales":
        editInfo(id);
        break;
      case "Clases":
        $('#modalClases').modal('toggle');
        const timetable = new Timetable();
        timetable.setScope(9, 21); // optional, only whole hours between 0 and 23
        timetable.addLocations(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']);
        url = '/alumnos?id=' + id;
        getData(encodeURI(url)).then(json => {
          console.log(json);
          const clases = json[0].clases;
          console.log(json.clases);
          clases.forEach(clase => {
            const asignatura = clase.asignatura.nombre;
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
      case "Dar de alta/baja":
        url = "/alumnos/" + id;
        res = encodeURI(url);
        Http.open("DELETE", res);
        Http.send();
        setTimeout(getResultados, 500);
        break;
    }
  });
}

function getResultados() {
  const data = getData('/alumnos');
  console.log(data);
  data.then(json => {
    table.clear().draw();
    for (let alumno of json) {
      if ($('#cbFiltro').is(':checked')) {
        if (alumno.fechaBaja) continue;
      }
      table.row.add([
        alumno.id,
        alumno.nombre,
        alumno.curso.nivel + ' - ' + alumno.curso.etapa,
        (alumno.responsable ? alumno.responsable.nombre : 'No Figura'),
        alumno.fechaAlta,
        (alumno.fechaBaja ? alumno.fechaBaja : 'No Figura')
      ]).draw(false);
    }
  });
}

function initRespForm() {
  select('#itRespNombre').changed(() => callback());
  select('#itRespApellido').changed(() => callback());
  select('#itRespNif').changed(() => callback());
  select('#itRespTelefono').changed(() => callback());
  select('#itRespCorreo').changed(() => callback());

  const callback = (() => {
    let sizes = [];
    sizes.push(select('#itRespNombre').value().length);
    sizes.push(select('#itRespApellido').value().length);
    sizes.push(select('#itRespNif').value().length);
    sizes.push(select('#itRespTelefono').value().length);
    sizes.push(select('#itRespCorreo').value().length);
    setRequired(false);
    for (let size of sizes) {
      if (size > 0) {
        setRequired(true);
        break;
      }
    }
  });

  const setRequired = ((value) => {
    $('#itRespNombre').attr('required', value);
    $('#itRespApellido').attr('required', value);
    $('#itRespNif').attr('required', value);
    $('#itRespTelefono').attr('required', value);
    $('#itRespCorreo').attr('required', value);
  });
}

function editInfo(id) {
  const data = getData(encodeURI('/alumnos?id=' + id));
  $('#btnCrear').html('Modificar');
  data.then(json => {
    const alumno = json[0];
    const responsable = alumno.responsable;
    select('#auxId').value(alumno.id);
    select('#itNombre').value(alumno.nombre);
    select('#itApellido').value(alumno.apellido);
    select('#itNif').value(alumno.nif);
    $('#itNif').attr('readonly', true);
    $('#itRespNif').attr('readonly', true);
    select('#itTelefono').value(alumno.telefono);
    select('#itCorreo').value(alumno.correo);
    select('#itCurso').value(alumno.curso.nivel + ' - ' + alumno.curso.etapa);
    $('#itCurso').attr('disabled', true);
    $('#cbRepetidor').attr('checked', alumno.repetidor);
    $('#itfalta').val(alumno.fechaAlta);
    select('#taObservaciones').value(alumno.observaciones);
    cleanRespForm();

    if (responsable) {
      select('#auxIdResp').value(responsable.id);
      select('#itRespNombre').value(responsable.nombre);
      select('#itRespApellido').value(responsable.apellido);
      select('#itRespNif').value(responsable.nif);
      select('#itRespTelefono').value(responsable.telefono);
      select('#itRespCorreo').value(responsable.correo);
    }

    select('#mdcrear-title').html('Editar Alumno');
    $('#mdCrearAlumno').modal('toggle');
    editMode = true;
  });
}

function cleanRespForm() {
  select('#itRespNombre').value('');
  select('#itRespApellido').value('');
  select('#itRespNif').value('');
  select('#itRespTelefono').value('');
  select('#itRespCorreo').value('');
}

function validateEmail(email) {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return (filter.test(String(email)));
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}