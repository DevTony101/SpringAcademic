let table;

function setup() {
  noCanvas();
  $('#successModal').modal('toggle');
  const itNombre = select('#searchName');
  const itNif = select('#searchNif');
  table = $('#tbBusqueda').DataTable({
    "columnDefs": [{
      "data": null,
      "defaultContent": "<a class='btn btn-primary' style='margin-right: 10px;' role='button' href='#'>Info</a>" +
        "<a class='btn btn-primary' style='margin-right: 10px;' role='button' href='#'>Clases</a>" +
        "<a class='btn btn-danger' role='button' href='#'>Eliminar</a>",
      "targets": -1
    }]
  });
  $('#btnBuscar').on('click', (e) => {
    e.preventDefault();
    const nombre = itNombre.value();
    const nif = itNif.value();
    if (nombre.length > 0 || nif.length > 0) {
      let query = '?nombre=' + nombre + '&nif=' + nif;
      const url = '/getProfesores' + query;
      const res = encodeURI(url);
      getData(res);
    }
  });

  $('#tbBusqueda tbody').on('click', 'a', function (e) {
    e.preventDefault();
    const data = table.row($(this).parents('tr')).data();
    const nif = data[1];
    const action = $(this).text();
    alert(nif + " " + action);
  });
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  table.clear().draw();
  data.forEach(profesor => {
    table.row.add([
      profesor.nombre,
      profesor.nif,
      profesor.correo,
      profesor.telefono
    ]).draw(false);
  });
}