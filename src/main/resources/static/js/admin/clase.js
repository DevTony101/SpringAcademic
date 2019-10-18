let table;
let slCurso;
let slProfesorBusqueda, slProfesorCrear;
let slAsignaturaBusqueda, slAsignaturaCrear;
let horario;

function setup() {
  noCanvas();
  horario = [];
  slCurso = select('#cursoBusqueda');
  slProfesorBusqueda = select('#profesorBusqueda');
  slProfesorCrear = select('#profesorCrear');
  slAsignaturaBusqueda = select('#asignaturaBusqueda');
  slAsignaturaCrear = select('#asignaturaCrear');
  initTable();
  initSelects();
  initHorario();
  sendForm();
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
      row += `"<td class='dia' data-dia=${dia} data-indicehora=${i} data-indicedia=${j}></td>"`
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

function sendForm() {
  $('#formClase').on('submit', () => {
    let url, p1, p2; // Promises
    const nombre = slProfesorCrear.value().split(" ")[0];
    url = './getProfesores?nombre=' + nombre;
    p1 = getData(encodeURI(url));
    url = './asignaturas?nombre=' + slAsignaturaCrear.value();
    p2 = getData(encodeURI(url));

    Promise.all([p1, p2]).then(values => {
      values[1][0].curso.alumnos = null;
      const clase = {
        profesor: values[0][0],
        asignatura: values[1][0],
        horasSemanales: horario
      }
      console.log(clase);
      $.ajax("/clases", {
        contentType: "application/json",
        dataType: 'json',
        type: "POST",
        data: JSON.stringify(clase),
        success: function (data) {
          console.log("ajax send successfully");
        }
      });
    });
    return false;
  });
}

function initSelects() {
  let data = getData('/cursos');
  data.then(json => {
    json.forEach(curso => {
      slCurso.option(curso.nivel + ' - ' + curso.etapa);
    });
  });

  data = getData('/getProfesores');
  data.then(json => {
    json.forEach(profesor => {
      slProfesorBusqueda.option(profesor.nombre + " " + profesor.apellido);
      slProfesorCrear.option(profesor.nombre + " " + profesor.apellido);
    });
  });

  data = getData('/asignaturas');
  data.then(json => {
    json.forEach(asignatura => {
      slAsignaturaBusqueda.option(asignatura.nombre);
      slAsignaturaCrear.option(asignatura.nombre);
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