let table;

function setup() {
  noCanvas();
  initTable();
  initCalendar();
  initSelects();
}

function initSelects() {
  const slCursos = selectAll('.sl-cursos');
  const slProfesores = selectAll('.sl-profesores');
  let data = getData('/getCursos');
  data.then(json => {
    json.forEach(curso => {
      for (let sl of slCursos) {
        sl.option(curso.nivel + ' - ' + curso.etapa);
      }
    });
  });

  data = getData('/getProfesores');
  data.then(json => {
    json.forEach(profesor => {
      for (let sl of slProfesores) {
        sl.option(profesor.nombre + " " + profesor.apellido);
      }
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

function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid', 'timeGrid'],
    selectable: true,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: function (info) {
      alert('clicked ' + info.dateStr);
    }
  });

  calendar.render();
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}