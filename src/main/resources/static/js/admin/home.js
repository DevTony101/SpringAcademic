function setup() {
  noCanvas();
  // Grafico de Cursos
  const ctxCursos = document.getElementById('chartCursos').getContext('2d');
  const chartCursos = new Chart(ctxCursos, {
    type: 'doughnut',
    data: {
      labels: ['Math', 'Chemistry', 'Biology', 'History', 'Geography'],
      datasets: [{
        label: 'Teachers by Course',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Teachers by Course'
      }
    }
  });

  // Graficos de Alumnos
  const ctxAlumnos = document.getElementById('chartAlumnos').getContext('2d');
  const chartAlumnos = new Chart(ctxAlumnos, {
    // The type of chart we want to create
    type: 'bar',
    data: {
      labels: ['2016', '2017', '2018', '2019'],
      datasets: [{
        label: '# of New Students',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(75, 192, 92, 0.2)',
          'rgba(75, 192, 92, 0.2)',
          'rgba(75, 192, 92, 0.2)',
          'rgba(75, 192, 92, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }, {
        label: '# of Suspended Students',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Created and Suspended'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}