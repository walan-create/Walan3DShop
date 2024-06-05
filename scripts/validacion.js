document.addEventListener('DOMContentLoaded', function() {
    const inputCorreo = document.getElementById('email');
    const Fcorreo = document.getElementById('registerFcorreo');
    const Tcorreo = document.getElementById('registerTcorreo');
    const labelCorreo = document.getElementById('label-correo');
    let correook = false;

    const inputPassword = document.getElementById('password');
    const Fpass = document.getElementById('registerFpass');
    const Tpass = document.getElementById('registerTpass');
    const labelPassword = document.getElementById('label-password');
    let passwordok = false;

    const inputRepPassword = document.getElementById('rep_password');
    const Frep = document.getElementById('registerFrep');
    const Trep = document.getElementById('registerTrep');
    const labelRepPassword = document.getElementById('label-rep_password');
    let repPasswordok = false;

    const termsCheckbox = document.querySelector('.checkbox');
    const labelTerms = document.getElementById('label-terms');
    let termsok = termsCheckbox.checked;

    // Mostrar mensajes de error al hacer foco en los campos solo si el valor no es válido
    inputCorreo.addEventListener('focus', () => {
        if (!correook) {
            labelCorreo.style.display = 'block';
        }
    });

    inputPassword.addEventListener('focus', () => {
        if (!passwordok) {
            labelPassword.style.display = 'block';
        }
    });

    inputRepPassword.addEventListener('focus', () => {
        if (!repPasswordok) {
            labelRepPassword.style.display = 'block';
        }
    });

    termsCheckbox.addEventListener('change', () => {
        termsok = termsCheckbox.checked;
        labelTerms.style.display = termsok ? 'none' : 'block';
    });

    inputCorreo.addEventListener('input', () => {
        const correoValido = inputCorreo.checkValidity();
        Tcorreo.style.display = correoValido ? 'block' : 'none';
        Fcorreo.style.display = correoValido ? 'none' : 'block';
        labelCorreo.style.display = correoValido ? 'none' : 'block';
        correook = correoValido;
    });

    inputPassword.addEventListener('input', () => {
        const passwordValida = inputPassword.checkValidity();
        Tpass.style.display = passwordValida ? 'block' : 'none';
        Fpass.style.display = passwordValida ? 'none' : 'block';
        labelPassword.style.display = passwordValida ? 'none' : 'block';
        passwordok = passwordValida;

        // Validar si la confirmación de la contraseña coincide
        const passwordsMatch = inputPassword.value === inputRepPassword.value;
        Trep.style.display = passwordsMatch ? 'block' : 'none';
        Frep.style.display = passwordsMatch ? 'none' : 'block';
        labelRepPassword.style.display = passwordsMatch ? 'none' : 'block';
        repPasswordok = passwordsMatch;
    });

    inputRepPassword.addEventListener('input', () => {
        const passwordsMatch = inputPassword.value === inputRepPassword.value;
        Trep.style.display = passwordsMatch ? 'block' : 'none';
        Frep.style.display = passwordsMatch ? 'none' : 'block';
        labelRepPassword.style.display = passwordsMatch ? 'none' : 'block';
        repPasswordok = passwordsMatch;
    });

    function mostrarVentanaEmergente(datos) {
        Swal.fire({
            title: '¡Registro exitoso!',
            html: `<p>Datos registrados:</p>
                   <p><strong>Nombre:</strong> ${datos.Nombre}</p>
                   <p><strong>Apellido:</strong> ${datos.Apellido}</p>
                   <p><strong>Correo:</strong> ${datos.Correo}</p>`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }

    function descargarJSON(datos) {
        const dataStr = JSON.stringify(datos, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'registro.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    const botonIngresar = document.getElementById('buttonIngresar');
    botonIngresar.addEventListener('click', (event) => {
        event.preventDefault();
        termsok = termsCheckbox.checked;
        if (correook && passwordok && repPasswordok && termsok) {
            const datos = {
                Nombre: document.getElementById('nom').value,
                Apellido: document.getElementById('num').value,
                Correo: document.getElementById('email').value
            };
            mostrarVentanaEmergente(datos);
            descargarJSON(datos);
        } else {
            let errorMsg = 'Algo está mal:<br>';
            if (!correook) errorMsg += '- Correo inválido<br>';
            if (!passwordok) errorMsg += '- Contraseña inválida<br>';
            if (!repPasswordok) errorMsg += '- Las contraseñas deben coincidir<br>';
            if (!termsok) errorMsg += '- Debes aceptar la política de privacidad<br>';
            Swal.fire({
                title: 'Error',
                html: errorMsg,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    });
});