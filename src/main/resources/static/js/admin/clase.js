let table;
let slCursos, slProfesores;

function setup() {
  noCanvas();
  slCursos = selectAll('.sl-cursos');
  slProfesores = selectAll('.sl-profesores');
  initTable();
  initSelects();
}

function initSelects() {
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

// function initCalendar() {
//   const calendarEl = document.getElementById('calendar');
//   const calendar = new FullCalendar.Calendar(calendarEl, {
//     plugins: ['interaction', 'dayGrid', 'timeGrid'],
//     selectable: true,
//     defaultView: 'timeGridWeek',
//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'timeGridWeek,timeGridDay'
//     },
//     dateClick: function (info) {
//       const date = info.date;
//       const campos = getCampos();
//       calendar.addEvent({
//         title: campos.curso + ' ' + campos.profesor,
//         start: date,
//         end: date
//       });
//       const dateStr = date.toLocaleString('en-GB');
//       console.log(dateStr);
//       $('#clHora').val(dateStr.substring(12, 20));
//       $('#clFecha').val(date.toISOString().substring(0, 10));
//       alert('clicked ' + date.getHours());
//     }
//   });

//   calendar.render();
// }

function getCampos() {
  return {
    curso: slCursos[1].value(),
    profesor: slProfesores[1].value()
  };
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}