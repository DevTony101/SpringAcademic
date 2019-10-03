let table;

function setup() {
  noCanvas();
  initTable();
  $('#successModal').modal('toggle');
  $('#itfalta').val(new Date().toISOString().substring(0, 10));
  $('#btnBuscar').on('click', () => {
    getData('/getAlumnos')
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
    "<a class='dropdown-item btn btn-danger' role='button' href='#'>Dar de alta/baja</a>" +
    "</div>" +
    "</div>"
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
  console.log(data);
  table.clear().draw();
  data.forEach(alumno => {
    table.row.add([
      alumno.nombre,
      alumno.curso,
      alumno.responsable.nombre,
      alumno.fechaAlta,
      alumno.fechaBaja
    ]).draw(false);
  });
}