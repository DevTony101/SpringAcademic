let table;

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
  const itCurso = select('#itCurso');
  const slCurso = select('#slCursos');
  const data = getData('/cursos');
  data.then(json => {
    json.forEach(curso => {
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
    "<a class='dropdown-item btn btn-primary' role='button' href='#'>Editar</a>" +
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
      case "Editar":
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
    json.forEach(alumno => {
      table.row.add([
        alumno.id,
        alumno.nombre,
        alumno.curso.nivel + ' - ' + alumno.curso.etapa,
        (alumno.responsable ? alumno.responsable.nombre : 'No Figura'),
        alumno.fechaAlta,
        (alumno.fechaBaja ? alumno.fechaBaja : 'No Figura')
      ]).draw(false);
    });
  });
}

function initRespForm() {
  select('#itRespNombre').changed(() => {
    const text = select('#itRespNombre').value();
    if (text.length > 0) {
      setRequired(true);
    } else {
      setRequired(false);
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

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}