function setup() {
  noCanvas();
  const itNombre = select('#searchName');
  const itNif = select('#searchNif');
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
  $('#tbBusqueda').DataTable({
    data: data,
    columns: [{
        data: 'id'
      },
      {
        data: 'nombre'
      },
      {
        data: 'nif'
      },
      {
        data: 'correo'
      },
      {
        data: 'telefono'
      }
    ]
  });
}