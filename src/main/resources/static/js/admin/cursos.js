let table;
let editMode = false;

function setup() {
  noCanvas();
  initTable();
  $('#successModal').modal('toggle');
  $('#failedModal').modal('toggle');
  getResultados();

  $('#formCurso').on('submit', () => {
    if (editMode) {
      const curso = {
        id: select('#auxId').value(),
        nivel: select('#spNivel').value(),
        etapa: select('#slEtapa').value()
      };

      $.ajax("/cursos", {
        contentType: "application/json",
        dataType: 'json',
        type: 'PUT',
        data: JSON.stringify(curso),
        success: function (data) {
          $('#mdCrearCurso').modal('toggle');
          getResultados();
        }
      });

      select('#auxId').value('');
      editMode = false;
      return false;
    }

    return true;
  });

  $('#btnNuevoCurso').on('click', (e) => {
    e.preventDefault();
    select('#spNivel').value('1');
    select('#mdcrear-title').html('Nuevo Curso');
    $('#mdCrearCurso').modal('toggle');
    editMode = false;
  });

  $('#mdCrearCurso').on('hidden.bs.modal', () => {
    editMode = false;
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
        editInfo(id);
        break;
      case "Eliminar":
        url = "/cursos/" + id;
        res = encodeURI(url);
        Http.open("DELETE", res);
        Http.send();
        setTimeout(getResultados, 500);
        break;
    }
  });
}

function editInfo(id) {
  const data = getData(encodeURI('/cursos?id=' + id));
  data.then(json => {
    const curso = json[0];
    select('#auxId').value(curso.id);
    select('#spNivel').value(curso.nivel);
    select('#slEtapa').value(curso.etapa);

    select('#mdcrear-title').html('Editar Curso');
    $('#mdCrearCurso').modal('toggle');
    editMode = true;
  });
}

function getResultados() {
  const data = getData('/cursos');
  data.then(json => {
    table.clear().draw();
    json.forEach(curso => {
      table.row.add([
        curso.id,
        curso.nivel,
        curso.etapa
      ]).draw(false);
    });
  });
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  return data;
}