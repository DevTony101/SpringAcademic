let table;
let cursoBusqueda, cursoCrear;
let profesorBusqueda, profesorCrear;
let asignaturaBusqueda, asignaturaCrear;

function setup() {
  noCanvas();
  cursoBusqueda = select('#cursoBusqueda');
  cursoCrear = select('#cursoCrear');
  profesorBusqueda = select('#profesorBusqueda');
  profesorCrear = select('#profesorCrear');
  asignaturaBusqueda = select('#asignaturaBusqueda');
  asignaturaCrear = select('#asignaturaCrear');
  initTable();
  initSelects();
}

function initSelects() {
  let data = getData('/getCursos');
  data.then(json => {
    json.forEach(curso => {
      cursoBusqueda.option(curso.nivel + ' - ' + curso.etapa);
      cursoCrear.option(curso.nivel + ' - ' + curso.etapa);
    });
  });

  data = getData('/getProfesores');
  data.then(json => {
    json.forEach(profesor => {
      profesorBusqueda.option(profesor.nombre + " " + profesor.apellido);
      profesorCrear.option(profesor.nombre + " " + profesor.apellido);
    });
  });

  data = getData('/getAsignaturas');
  data.then(json => {
    json.forEach(asignatura => {
      asignaturaBusqueda.option(asignatura.nombre);
      asignaturaCrear.option(asignatura.nombre);
    });
  });
}

function initTable() {
  const btnTabla = "<div class='btn-group' style='margin: 0'>" +
    "<button class='btn bmd-btn-icon dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
    "<i class='material-icons'>more_vert</i>" +
    "</button>" +
    "<div class='dropdown-menu dropdown-menu-left'>" +
    "<a class='dropdown-item btn btn-primary' role='button' href='#'>Info</a>" +
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
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}