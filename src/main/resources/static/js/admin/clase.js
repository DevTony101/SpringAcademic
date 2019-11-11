let table;
let slAsignaturaCrear;
let slCursoBusqueda, slCursoCrear;
let slProfesorBusqueda, slProfesorCrear;
let horario;

function setup() {
  noCanvas();
  horario = [];
  slCursoBusqueda = select('#cursoBusqueda');
  slCursoCrear = select('#cursoCrear');
  slProfesorBusqueda = select('#profesorBusqueda');
  slProfesorCrear = select('#profesorCrear');
  slAsignaturaCrear = select('#asignaturaCrear');
  initTable();
  initSelects();
  initHorario();
  sendForm();

  $('#btnBuscar').on('click', () => {
    getResultados();
  });

  $('#aCrearClase').on('click', (e) => {
    e.preventDefault();
    loadSchedule();
    $('#mdCrearClase').modal('toggle');
  });

  slProfesorCrear.changed(() => {
    loadSchedule();
  });
}

function initHorario() {
  let row;
  const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
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

    if (!td.hasClass('occuped')) {
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
    }
  });
}

function sendForm() {
  $('#formClase').on('submit', () => {
    let url, p1, p2; // Promises
    const nombre = slProfesorCrear.value().split(" ")[0];
    url = './profesores?nombre=' + nombre;
    p1 = getData(encodeURI(url));

    const curso = slCursoCrear.value().split(" ");
    const nivel = curso[0];
    const etapa = curso[2];
    url = './curso/asignaturas?nivel=' + nivel + '&etapa=' + etapa + '&nombre=' + slAsignaturaCrear.value();
    p2 = getData(encodeURI(url));

    Promise.all([p1, p2]).then(values => {
      console.log(values);
      values[1][0].curso.alumnos = null;
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
  let data = getData('/profesores');
  slProfesorBusqueda.option('Todos');
  data.then(json => {
    json.forEach(profesor => {
      const nombre = String(profesor.nombre + " " + profesor.apellido);
      const htmlOption = `<option value='${nombre}' data-nif=${profesor.nif}>${nombre}</option>`;
      $('#profesorCrear').append(htmlOption);
      $('#profesorBusqueda').append(htmlOption);
    });
  });

  data = getData('/cursos');
  data.then(json => {
    slCursoBusqueda.option('Todos');
    json.forEach(curso => {
      slCursoBusqueda.option(curso.nivel + ' - ' + curso.etapa);
      slCursoCrear.option(curso.nivel + ' - ' + curso.etapa);
    });
  });

  slCursoCrear.changed(() => {
    $('#asignaturaCrear option').remove();
    const curso = slCursoCrear.value().split(" ");
    const nivel = curso[0];
    const etapa = curso[2];
    const url = '/curso/asignaturas?nivel=' + nivel + '&etapa=' + etapa;
    data = getData(encodeURI(url));
    data.then(json => {
      json.forEach(asignatura => {
        slAsignaturaCrear.option(asignatura.nombre);
      });
    });

    $('#asignaturaCrear').attr('disabled', false);
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
  let data;
  const curso = slCursoBusqueda.value();
  const nif = $('#profesorBusqueda').children("option:selected").data('nif');
  if (curso === 'Todos' && slProfesorBusqueda.value() === 'Todos') {
    data = getData(encodeURI('/clases'));
  } else if (curso !== 'Todos' && slCursoBusqueda.value() !== 'Todos') {
    data = getData(encodeURI('/clases?curso=' + curso + '&nif=' + nif));
  } else if (curso !== 'Todos') {
    data = getData(encodeURI('/clases?curso=' + curso));
  } else {
    data = getData(encodeURI('/clases?nif=' + nif));
  }

  data.then(json => {
    table.clear().draw();
    json.forEach(clase => {
      table.row.add([
        clase.id,
        (clase.asignatura.curso.nivel + ' - ' + clase.asignatura.curso.etapa),
        clase.asignatura.nombre,
        (clase.profesor.nombre + ' ' + clase.profesor.apellido),
      ]).draw(false);
    });
  });
}

function loadSchedule() {
  horario.splice(0);
  $('#tbHorario').find('td').removeClass('selected');
  $('#tbHorario').find('td').removeClass('occuped');
  $('#tbHorario').find('td').each((i, elem) => {
    if ($(elem).hasClass('dia')) $(elem).text(' ');
  });

  const nif = $('#profesorCrear').children("option:selected").data('nif');
  const data = getData(encodeURI('/profesores?nif=' + nif));
  data.then(json => {
    console.log(json);
    const clases = json[0].clases;
    clases.forEach(clase => {
      let asignatura = clase.asignatura.nombre;
      asignatura += ' - ' + clase.asignatura.curso.nivel + clase.asignatura.curso.etapa.substring(0, 1);
      const horasSemanales = clase.horasSemanales;
      horasSemanales.forEach(hora => {
        const diaIndice = Number(hora.diaIndice);
        const horaIndice = Number(hora.horaIndice);
        $('#tbHorario').find('td').each((i, elem) => {
          const diaTd = Number($(elem).data('indicedia'));
          const horaTd = Number($(elem).data('indicehora'));
          if (diaIndice == diaTd && horaIndice == horaTd) {
            $(elem).addClass('occuped');
            $(elem).text(asignatura);
          }
        });
      });
    });
  });
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}