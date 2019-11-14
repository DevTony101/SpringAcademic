let send = true;

function setup() {
  noCanvas();
  $('#formUsuario').on('submit', () => {
    if (send) {
      const contra1 = select('#itContra1').value();
      const contra2 = select('#itContra2').value();
      if (contra1 !== contra2) {
        $('#alertContra').css('display', 'block');
      } else {
        const nombre = $('#spanUsuario').html();
        const user = {
          usuario: nombre,
          clave: contra1
        };

        $.ajax("/usuarios", {
          contentType: "application/json",
          dataType: 'json',
          type: 'PUT',
          data: JSON.stringify(user),
          success: function (data) {
            console.log(data);
            $('#successModal').modal('toggle');
          }
        });
      }
    }
    return false;
  });

  $('#successModal').on('hidden.bs.modal', () => {
    $('#itContra1').attr('disabled', true);
    $('#itContra2').attr('disabled', true);
    send = false;
  });
}