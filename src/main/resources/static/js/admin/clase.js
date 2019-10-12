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
  initHorario();
}

function initHorario() {
  for (let i = 10; i <= 20; i++) {
    const row = `"<tr id=${i}>"` +
      "<td>" + i + ":00 - " + (i + 1) + ":00</td>" +
      "<td class='dia lunes'></td>" +
      "<td class='dia martes'></td>" +
      "<td class='dia miercoles'></td>" +
      "<td class='dia jueves'></td>" +
      "<td class='dia viernes'></td>" +
      "</tr>";
    $('#tbHorario').append(row);
  }

  $('#tbHorario').on('click', '.dia', (e) => {
    const td = $(e.currentTarget);
    const tr = td.closest('tr');
    let hora = tr.attr('id');
    let dia = td.attr('class');
    dia = dia.substring(4, dia.length);
    $('#itHora').val(hora + ':00:00');
    $('#itDia').val(dia);
    if (td.hasClass('selected')) {
      td.removeClass('selected');
    } else {
      td.addClass('selected');
    };
  });
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