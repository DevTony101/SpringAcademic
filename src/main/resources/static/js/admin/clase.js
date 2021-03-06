let tablaBusqueda, tablaAlumnos;
let slAsignaturaCrear;
let slCursoBusqueda, slCursoCrear;
let slProfesorBusqueda, slProfesorCrear;
let horario;
let editMode = false;

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
    editMode = false;

    actualizarAsignaturas();
    $('#cursoCrear').attr('disabled', false);
    $('#profesorCrear').attr('disabled', false);
    $('#asignaturaCrear').attr('disabled', false);

    loadSchedule();
    select('#mdcrear-title').html('Nueva Clase');
    $('#btnCrear').html('Crear');
    $('#mdCrearClase').modal('toggle');
  });

  slProfesorCrear.changed(() => {
    loadSchedule();
  });

  $('#mdCrearClase').on('hidden.bs.modal', () => {
    editMode = false;
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
        $(td).text('');
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
        $(td).text(slAsignaturaCrear.value() + ' - ' + slCursoCrear.value().substring(0, 1) + slCursoCrear.value().substring(4, 5));
        td.addClass('selected');
        horario.push(hSem);
      };
      console.log(horario);
    }
  });
}

function sendForm() {
  $('#formClase').on('submit', () => {
    let httpMethod = 'POST';
    if (editMode) {
      httpMethod = 'PUT';
      horario.splice(0);
      $('#tbHorario').find('td').each((i, elem) => {
        if ($(elem).hasClass('dia') && $(elem).hasClass('selected')) {
          const tr = $(elem).closest('tr');
          const hSem = { // Objeto hora semanal
            dia: $(elem).data('dia'),
            hora: tr.data('hora'),
            diaIndice: $(elem).data('indicedia'),
            horaIndice: $(elem).data('indicehora')
          };
          console.log($(elem));
          console.log(hSem);
          horario.push(hSem);
        }
      });

      if (horario.length <= 0) {
        $('#btnCrear').popover('show');
        return false;
      }
    }

    let url, p1, p2; // Promises
    const nif = $('#profesorCrear').children("option:selected").data('nif');
    url = './profesores?nif=' + nif;
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

      if (editMode) {
        clase['id'] = select('#idCurso').value();
      }

      $.ajax("/clases", {
        contentType: "application/json",
        dataType: 'json',
        type: httpMethod,
        data: JSON.stringify(clase),
        success: function (data) {
          horario.splice(0);
          $('#tbHorario').find('td').removeClass('selected');
          $('#mdCrearClase').modal('toggle');
          (httpMethod === 'POST' ? $('#successModal').modal('toggle') : console.log('Success update'));
        }
      });
    });

    return false;
  });
}

function initSelects() {
  let data;
  data = getData('/profesores');
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
    actualizarAsignaturas();
  });

  slCursoCrear.changed(() => {
    $('#tbHorario').find('td').each((i, elem) => {
      if ($(elem).hasClass('dia') && $(elem).hasClass('selected')) $(elem).text(' ');
    });
    $('#tbHorario').find('td').removeClass('selected');
    actualizarAsignaturas();
  });

  slAsignaturaCrear.changed(() => {
    $('#tbHorario').find('td').each((i, elem) => {
      if ($(elem).hasClass('dia') && $(elem).hasClass('selected')) $(elem).text(' ');
    });
    $('#tbHorario').find('td').removeClass('selected');
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

  // Inicializacion para tabla de alumnos
  tablaAlumnos = $('#tbAlumnos').DataTable();
  // Inicializacion para tabla de busqueda
  tablaBusqueda = $('#tbBusqueda').DataTable({
    "columnDefs": [{
      "data": null,
      "defaultContent": btnTabla,
      "targets": -1
    }]
  });

  $('#tbBusqueda tbody').on('click', 'a', function (e) {
    e.preventDefault();
    const data = tablaBusqueda.row($(this).parents('tr')).data();
    const id = data[0];
    const curso = data[1];
    const asignatura = data[2];
    const profesor = data[3];
    const action = $(this).text();
    const Http = new XMLHttpRequest();
    let url, res;
    switch (action) {
      case "Editar":
        editInfo(id, curso, asignatura, profesor);
        break;
      case "Alumnos":
        mostrarAlumnos(id);
        break;
      case "Eliminar":
        url = "/clases/" + id;
        res = encodeURI(url);
        Http.open("DELETE", res);
        Http.send();
        setTimeout(getResultados, 500);
        break;
    }
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
    tablaBusqueda.clear().draw();
    json.forEach(clase => {
      tablaBusqueda.row.add([
        clase.id,
        (clase.asignatura.curso.nivel + ' - ' + clase.asignatura.curso.etapa),
        clase.asignatura.nombre,
        (clase.profesor.nombre + ' ' + clase.profesor.apellido),
      ]).draw(false);
    });
  });
}

function loadSchedule(arg) { // arg -> argumento opcional (nombre de la asignatura)
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
            if (arg && arg === clase.asignatura.nombre) {
              $(elem).addClass('selected')
            } else {
              $(elem).addClass('occuped');
            }
            $(elem).text(asignatura);
          }
        });
      });
    });
  });
}

function editInfo(id, curso, asignatura, profesor) {
  editMode = true;
  $('#btnCrear').html('Modificar');
  select('#idCurso').value(id);
  $('#asignaturaCrear option').remove();
  slAsignaturaCrear.option(asignatura);
  $('#cursoCrear').val(curso);
  $('#profesorCrear').val(profesor);
  $('#cursoCrear').attr('disabled', true);
  $('#profesorCrear').attr('disabled', true);
  $('#asignaturaCrear').attr('disabled', true);

  select('#mdcrear-title').html('Editar Clase');
  $('#mdCrearClase').modal('toggle');
  loadSchedule(asignatura);
}

function mostrarAlumnos(id) {
  const data = getData(encodeURI('/clases/' + id));
  data.then(json => {
    tablaAlumnos.clear().draw();
    const alumnos = json.asignatura.curso.alumnos;
    alumnos.forEach(alumno => {
      tablaAlumnos.row.add([
        alumno.id,
        alumno.nombre,
        alumno.apellido
      ]).draw(false);
    });
    $('#modalAlumnos').modal('toggle');
  });
}

function actualizarAsignaturas() {
  $('#asignaturaCrear option').remove();
  const curso = slCursoCrear.value().split(" ");
  const nivel = curso[0];
  const etapa = curso[2];
  const url = '/curso/asignaturas?nivel=' + nivel + '&etapa=' + etapa;
  getData(encodeURI(url)).then(json => {
    json.forEach(asignatura => {
      slAsignaturaCrear.option(asignatura.nombre);
    });
  });
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}