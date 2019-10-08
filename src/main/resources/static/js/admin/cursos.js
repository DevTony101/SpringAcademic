let table;

function setup() {
  noCanvas();
  initTable();
  $('#successModal').modal('toggle');
  getData('/getCursos');
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

  table = $('#tbCursos').DataTable({
    "columnDefs": [{
      "data": null,
      "defaultContent": btnTabla,
      "targets": -1
    }]
  });

  $('#tbCursos tbody').on('click', 'a', function (e) {
    e.preventDefault();
    const data = table.row($(this).parents('tr')).data();
    const id = data[0];
    const action = $(this).text();
    const Http = new XMLHttpRequest();
    let url, res;
    switch (action) {
      case "Editar":
        break;
      case "Eliminar":
        url = "/eliminarCurso/" + id;
        res = encodeURI(url);
        Http.open("GET", res);
        Http.send();
        break;
    }
    setTimeout(getResultados, 500);
  });
}

function getResultados() {
  getData('/getCursos');
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  table.clear().draw();
  data.forEach(curso => {
    table.row.add([
      curso.id,
      curso.nivel,
      curso.etapa
    ]).draw(false);
  });
}