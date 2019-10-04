let table;

function setup() {
  noCanvas();
  initTable();
  initForm();
  $('#successModal').modal('toggle');
  $('#btnBuscar').on('click', () => {
    getResultados();
  });
}

function initForm() {
  $('#itfalta').val(new Date().toISOString().substring(0, 10));
  getCursos();
}

function getCursos() {
  const slCurso = select('#itCurso');
  const data = getData('/getCursos');
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
    "<a class='dropdown-item btn btn-primary' role='button' href='#'>Info</a>" +
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
      if (data[5]) { // Vector - Posicion de fecha baja
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
      case "Info":
        break;
      case "Clases":
        break;
      case "Dar de alta/baja":
        url = "/bajarAlumno/" + id;
        res = encodeURI(url);
        Http.open("GET", res);
        Http.send();
        break;
    }
    setTimeout(getResultados, 500);
  });
}

function getResultados() {
  const data = getData('/getAlumnos');
  console.log(data);
  data.then(json => {
    table.clear().draw();
    json.forEach(alumno => {
      table.row.add([
        alumno.id,
        alumno.nombre,
        alumno.curso,
        (alumno.responsable ? alumno.responsable.nombre : 'No Figura'),
        alumno.fechaAlta,
        alumno.fechaBaja
      ]).draw(false);
    });
  });
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}