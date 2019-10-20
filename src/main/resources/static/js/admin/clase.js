let table;
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

  $('#btnBuscar').on('click', () => {
    getResultados();
  });
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
      values[1][0].curso = null
      const clase = {
        profesor: values[0][0],
        asignatura: values[1][0],
        horasSemanales: horario
      }

      $.ajax("/clases", {
        contentType: "application/json",
        dataType: 'json',
        type: "POST",
        data: JSON.stringify(clase),
        success: function (data) {
          horario.splice(0);
          $('#tbHorario').find('td').removeClass('selected');
          $('#mdCrearClase').modal('toggle');
          $('#successModal').modal('toggle');
        }
      });
    });
    return false;
  });
}

function initSelects() {
  let data = getData('/getProfesores');
  slProfesorBusqueda.option('Todos');
  data.then(json => {
    json.forEach(profesor => {
      slProfesorBusqueda.option(profesor.nombre + " " + profesor.apellido);
      slProfesorCrear.option(profesor.nombre + " " + profesor.apellido);
    });
  });

  data = getData('/asignaturas');
  slAsignaturaBusqueda.option('Todos');
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
    "<a class='dropdown-item btn btn-primary' role='button' href='#'>Editar</a>" +
    "<a class='dropdown-item btn btn-primary' role='button' href='#'>Alumnos</a>" +
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

  $('#tbBusqueda tbody').on('click', 'a', function (e) {
    e.preventDefault();
    const data = table.row($(this).parents('tr')).data();
    const id = data[0];
    const action = $(this).text();
    const Http = new XMLHttpRequest();
    let url, res;
    switch (action) {
      case "Editar":
        break;
      case "Alumnos":
        break;
      case "Eliminar":
        url = "/clases/" + id;
        res = encodeURI(url);
        Http.open("DELETE", res);
        Http.send();
        break;
    }
    setTimeout(getResultados, 500);
  });
}

function getResultados() {
  const asignatura = slAsignaturaBusqueda.value();
  let profesor = slProfesorBusqueda.value();
  profesor = profesor.split(" ")[0];
  const url = '/clases?asignatura=' + asignatura + '&profesor=' + profesor;
  const data = getData(encodeURI(url));
  data.then(json => {
    table.clear().draw();
    json.forEach(clase => {
      console.log(clase);
      table.row.add([
        clase.id,
        (clase.asignatura.curso.nivel + ' - ' + clase.asignatura.curso.etapa),
        clase.asignatura.nombre,
        (clase.profesor.nombre + ' ' + clase.profesor.apellido),
      ]).draw(false);
    });
  });
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}