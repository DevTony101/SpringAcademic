let table;

function setup() {
  noCanvas();
  $('#successModal').modal('toggle');
  const itNombre = select('#searchName');
  const itNif = select('#searchNif');
  table = $('#tbBusqueda').DataTable();
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
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  table.clear().draw();
  data.forEach(profesor => {
    table.row.add([
      profesor.id,
      profesor.nombre,
      profesor.nif,
      profesor.correo,
      profesor.telefono
    ]).draw(false);
  });
}