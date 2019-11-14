function setup() {
  noCanvas();
  initVanta();
  $('#linkContra').on('click', (e) => {
    e.preventDefault();
    const usuario = select('#username').value();
    if (usuario.length > 0) {
      const data = getData(encodeURI('/usuarios?usuario=' + usuario));
      data.then(json => {
        const usuario = json;
        usuario.usuarioProfesor.usuario = null;
        console.log(usuario);
        if (usuario.token) {
          $('#alertToken').css('display', 'block');
        } else {
          $.ajax("/restablecerContraseña", {
            contentType: "application/json",
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(usuario),
            success: function (data) {
              $('#alertCorreo').css('display', 'block');
              console.log(data);
            }
          });
        }
      }).catch(err => {
        $('#alertUsuario').css('display', 'block');
      });
    } else {
      $('#alertUsuario').css('display', 'block');
    }
  });
}

function initVanta() {
  VANTA.WAVES({
    el: "#waves",
    color: 0x8838,
    shininess: 43.00,
    waveHeight: 14.00,
    waveSpeed: 0.7,
    zoom: 0.75
  });
}

async function getData(apiUrl) {
  const response = await fetch(apiUrl);
  console.log(response);
  const data = await response.json();
  return data;
}