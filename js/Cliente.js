const url = 'http://localhost:3000/cliente';
const contenedor = document.getElementById('data');
let resultado = '';

const CargaCliente = (clientes) => {
    clientes.forEach((cliente) => {
    resultado += `
        <tr>
        <td class="table-dark">${cliente.IdCliente}</td>
        <td class="table-dark">${cliente.NombreCliente}</td>
        <td class="table-dark">${cliente.ApellidoCliente}</td>
        <td class="table-dark">${cliente.Direccion}</td>
        <td class="table-dark">${cliente.FechaNacimiento}</td>
        <td class="table-dark">${cliente.Celular}</td>
        <td class="table-dark">${cliente.Email}</td>
        <td class="table-dark">${cliente.Pais}</td>
        <td class="table-dark">${cliente.Ciudad}</td>
        <td class="table-dark"><button type="submit" class="btn btn-danger btnDelete">Eliminar</button></td>
        <td class="table-dark"><button type="submit" class="btn btn-success btnEditar">Editar</button></td>
        </tr>
    `;
    });
    contenedor.innerHTML = resultado;
};

const token = sessionStorage.getItem('Token');

fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: token,
    },
    })
    .then((response) => response.json())
    .then((data) => CargaCliente(data))
    .catch((error) => console.log(error));
    const on = (element, event, selector, handler) => {
        element.addEventListener(event, (e) => {
            if (e.target.closest(selector)) {
            handler(e);
            }
        });
    };


//              Eliminacion de datos de la tabla 

on(document, 'click', '.btnDelete', (e) => { 
    console.log("Eliminacion realizada")
    
    Swal.fire({
        title: '¿Estás seguro de que deseas eliminar a este Cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
        fila = e.target.parentNode.parentNode
        const codigo = fila.firstElementChild.innerHTML
        fetch(url + "/" + codigo, {
            method: "DELETE",
            headers: {
            Authorization: token,
        }
        })
        .then(response => response.json())
        .then(() => location.reload ())
        }
    })
})


//                 Agregar datos de la tabla

let operacion = "adicionar"


formpro.addEventListener("submit", (e) => {
    e.preventDefault()
    if (operacion == "adicionar"){ 
    fetch(url, {method: "POST",
    headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        },
                body: JSON.stringify({
                    NombreCliente:NombreCliente.value,
                    ApellidoCliente:ApellidoCliente.value,
                    Direccion:Direccion.value,
                    FechaNacimiento:FechaNacimiento.value,
                    Celular:Celular.value,
                    Email:Email.value,
                    Pais:Pais.value,
                    Ciudad:Ciudad.value,
                })
        })
    .then(response => response.json())
    .then (data => {
        const nuevo_cliente = []
        nuevo_cliente.push(data)
    })

    }
    if (operacion == "modificar"){ 
        fetch(url + '/' + id_form ,{method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            },
                    body: JSON.stringify({
                        NombreCliente:NombreCliente.value,
                        ApellidoCliente:ApellidoCliente.value,
                        Direccion:Direccion.value,
                        FechaNacimiento:FechaNacimiento.value,
                        Celular:Celular.value,
                        Email:Email.value,
                        Pais:Pais.value,
                        Ciudad:Ciudad.value,
                    })
            })
        .then(response => response.json())
        .then (data => {
            const nuevo_cliente = []
            nuevo_cliente.push(data)
        })

        }
})

//              Modificacion de datos mandados al formulario de la tabla

let id_form = 0
on (document, 'click', '.btnEditar', e => { 
    console.log("Edicion realizada")
    const fila = e.target.parentNode.parentNode
    id_form = fila.children[0].innerHTML
        const fNombreCliente = fila.children[1].innerHTML
        const fApellidoCliente = fila.children[2].innerHTML
        const fDireccion = fila.children[3].innerHTML
        const fFechaNacimiento = fila.children[4].innerHTML
        const fCelular = fila.children[5].innerHTML
        const fEmail = fila.children[6].innerHTML
        const fPais = fila.children[7].innerHTML
        const fCiudad = fila.children[8].innerHTML
    NombreCliente.value = fNombreCliente
    ApellidoCliente.value = fApellidoCliente
    Direccion.value = fDireccion
    FechaNacimiento.value = fFechaNacimiento
    Celular.value = fCelular
    Email.value = fEmail
    Pais.value = fPais
    Ciudad.value = fCiudad
    operacion = "modificar"
})


const form = document.querySelector('#formpro');
const nombrecliente = document.querySelector('#NombreCliente');
const apellidocliente = document.querySelector('#ApellidoCliente');
const direccion = document.querySelector('#Direccion');
const fechanac = document.querySelector('#FechaNacimiento');
const celular = document.querySelector('#Celular');
const email = document.querySelector('#Email');
const pais = document.querySelector('#Pais');
const ciudad = document.querySelector('#Ciudad');


form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!/^[a-zA-Z\s]+$/.test(nombrecliente.value.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un Nombre para el cliente. (valido)'
        });
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(apellidocliente.value.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un Apellido para el cliente. (valido)'
        });
        return;
    }

    if (direccion.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese una Direccion.'
        });
        return;
    }
    if (fechanac.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese una Fecha de Nacimiento.'
        });
        return;
    }
    if (celular.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un Nro de Celular.'
        });
        return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un Email válido.'
        });
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(pais.value.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un Pais válido (solo letras y espacios en blanco).'
        });
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(ciudad.value.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese una Ciudad válida (solo letras y espacios en blanco).'
        });
        return;
    }


    Swal.fire({
        icon: 'success',
        title: '¡Formulario enviado con éxito!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit();
        }
    });
});


function logout() {
    sessionStorage.removeItem("Token");
}

function validarEmail(email) {
    // Expresión regular para validar un correo electrónico
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}