function setup() {
  noCanvas();
  $('#successModal').modal('toggle');
  $('#failedModal').modal('toggle');
  initTable();
  getAsignaturas();
  getCursos();
}

function getAsignaturas() {
  const data = getData('/asignaturas');
  data.then(json => {
    table.clear().draw();
    json.forEach(asignatura => {
      table.row.add([
        asignatura.id,
        asignatura.nombre,
        asignatura.curso.nivel + ' - ' + asignatura.curso.etapa
      ]).draw(false);
    });
  });
}

function getCursos() {
  const slCurso = select('#slCurso');
  const data = getData('/cursos');
  data.then(json => {
    json.forEach(curso => {
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
    "<a class='dropdown-item btn btn-danger' role='button' href='#'>Eliminar</a>" +
    "</div>" +
    "</div>";

  table = $('#tbAsignaturas').DataTable({
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
  console.log(data);
  return data;
}