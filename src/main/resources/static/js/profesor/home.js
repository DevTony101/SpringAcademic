function setup() {
  noCanvas();
  initHorario();
}

function initHorario() {
  const nombre = String($('#spNombre').html()).trim();
  console.log(nombre);
  const timetable = new Timetable();
  timetable.setScope(9, 21); // optional, only whole hours between 0 and 23
  timetable.addLocations(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']);
  url = '/clases?profesor=' + nombre;
  getData(encodeURI(url)).then(json => {
    json.forEach(clase => {
      let asignatura = clase.asignatura.nombre;
      asignatura += ' - ' + clase.asignatura.curso.nivel + clase.asignatura.curso.etapa.substring(0, 1);
      const horasSemanales = clase.horasSemanales;
      horasSemanales.forEach(horario => {
        const dia = horario.dia;
        let hora = horario.hora.split(":")[0];
        hora = Number(hora);
        timetable.addEvent(asignatura, dia, new Date(2019, 10, 20, hora, 0), new Date(2019, 10, 20, (hora + 1), 0));
      });
    });
    const renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable');
  });
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  return data;
}