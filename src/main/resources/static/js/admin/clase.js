let table;
let cursoBusqueda, cursoCrear;
let profesorBusqueda, profesorCrear;
let asignaturaBusqueda, asignaturaCrear;
let horario;

function setup() {
  noCanvas();
  horario = [];
  cursoBusqueda = select('#cursoBusqueda');
  cursoCrear = select('#cursoCrear');
  profesorBusqueda = select('#profesorBusqueda');
  profesorCrear = select('#profesorCrear');
  asignaturaBusqueda = select('#asignaturaBusqueda');
  asignaturaCrear = select('#asignaturaCrear');
  initTable();
  initSelects();
  initHorario();
}

function initHorario() {
  let row;
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  for (let i = 0; i <= 10; i++) {
    //i controla los indices de la matriz del horario
    //se le suma 10 y 11 para mostrar la hora de comienzo y fin respectivamente
    row = `"<tr data-hora=${(i + 10) + ':00:00'}>"`;
    row += "<td>" + (i + 10) + ":00 - " + (i + 11) + ":00</td>";
    for (let j = 0; j < dias.length; j++) {
      const dia = dias[j];
      row += `"<td class='dia' data-dia=${dia} data-indicehora=${i} data-indicedia=${i + j}></td>"`
    }
    $('#tbHorario').append(row);
  }

  $('#tbHorario').on('click', '.dia', (e) => {
    const td = $(e.currentTarget);
    const tr = td.closest('tr');
    const hSem = { // Objeto hora semanal
      dia: td.data('dia'),
      hora: tr.data('hora'),
      diaIndice: td.data('indicedia'),
      horaIndice: td.data('indicehora')
    };

    if (td.hasClass('selected')) {
      td.removeClass('selected');
      // Ya que js no compara atributos de objetos
      // Es mejor usar filter para crear un nuevo array sin
      // el objeto (hora) que se acaba de pulsar
      horario = horario.filter(obj => {
        const con1 = obj.diaIndice != hSem.diaIndice;
        const con2 = obj.horaIndice != hSem.horaIndice;
        return (con1 || con2);
      });
    } else {
      td.addClass('selected');
      horario.push(hSem);
    };
    console.log(horario);
  });
}

function initSelects() {
  let data = getData('/getCursos');
  data.then(json => {
    json.forEach(curso => {
      cursoBusqueda.option(curso.nivel + ' - ' + curso.etapa);
      cursoCrear.option(curso.nivel + ' - ' + curso.etapa);
    });
  });

  data = getData('/getProfesores');
  data.then(json => {
    json.forEach(profesor => {
      profesorBusqueda.option(profesor.nombre + " " + profesor.apellido);
      profesorCrear.option(profesor.nombre + " " + profesor.apellido);
    });
  });

  data = getData('/getAsignaturas');
  data.then(json => {
    json.forEach(asignatura => {
      asignaturaBusqueda.option(asignatura.nombre);
      asignaturaCrear.option(asignatura.nombre);
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

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}