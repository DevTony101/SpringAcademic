let table;
let itNombre, itNif;

function setup() {
  noCanvas();
  initTimetable();
  const inputNif = select('#itNif');
  const smNif = select('#smNif');

  $('#successModal').modal('toggle');
  itNombre = select('#searchName');
  itNif = select('#searchNif');
  table = $('#tbBusqueda').DataTable({
    "columnDefs": [{
      "data": null,
      "defaultContent": "<a class='btn btn-primary' style='margin-right: 10px;' role='button' href='#'>Info</a>" +
        "<a class='btn btn-primary' style='margin-right: 10px;' role='button' href='#'>Clases</a>" +
        "<a class='btn btn-danger' role='button' href='#'>Eliminar</a>",
      "targets": -1
    }]
  });

  $('#formProfesor').on('submit', () => {
    if (smNif.hasClass('show-error')) {
      return false;
    }
    return true;
  })

  $('#btnBuscar').on('click', (e) => {
    e.preventDefault();
    getResultados();
  });

  $('#tbBusqueda tbody').on('click', 'a', function (e) {
    e.preventDefault();
    const data = table.row($(this).parents('tr')).data();
    const nif = data[1];
    const action = $(this).text();
    const Http = new XMLHttpRequest();
    let url, res;
    switch (action) {
      case "Info":
        break;
      case "Clases":
        $('#modalClases').modal('toggle');
        break;
      case "Eliminar":
        url = "/eliminarProfesor/" + nif;
        res = encodeURI(url);
        Http.open("GET", res);
        Http.send();
        break;
    }
    setTimeout(getResultados, 500);
  });


  inputNif.input(() => {
    const text = inputNif.value();
    smNif.removeClass('show-error');
    smNif.addClass('hidden');
    fetch('/getProfesores').then(response => response.json()).then(json => {
      json.forEach(profesor => {
        if (text === profesor.nif) {
          smNif.removeClass('hidden');
          smNif.addClass('show-error');
        }
      })
    })
  });
}

function initTimetable() {
  var timetable = new Timetable();
  timetable.setScope(9, 23); // optional, only whole hours between 0 and 23

  timetable.addLocations(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados']);

  timetable.addEvent('Matematicas', 'Martes', new Date(2019, 9, 30, 13, 45), new Date(2019, 9, 30, 14, 30));
  timetable.addEvent('Sociales', 'Lunes', new Date(2019, 9, 30, 15, 30), new Date(2019, 9, 30, 18, 30));
  timetable.addEvent('Biologia', 'Jueves', new Date(2019, 9, 30, 10, 15), new Date(2019, 9, 30, 13, 30));

  var renderer = new Timetable.Renderer(timetable);
  renderer.draw('.timetable'); // any css selector
}

function getResultados() {
  const nombre = itNombre.value();
  const nif = itNif.value();
  const url = '/getProfesores';
  let query = '';
  let res;
  if (nombre.length > 0 && nif.length > 0) {
    query = '?nombre=' + nombre + '&nif=' + nif;
  } else if (nombre.length > 0) {
    query = '?nombre=' + nombre;
  } else if (nif.length > 0) {
    query = '?nif=' + nif;
  }
  res = encodeURI(url + query);
  getData(res);
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