
const url = 'http://localhost:3000/usuario' 


const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargaUsuario = (usuarios)=>{
    usuarios.forEach( usuario => {
        resultado += 
        `<tr>
            <td class="table-dark">${usuario.IdUsuario}</td>
            <td class="table-dark">${usuario.NombreDeUsuario}</td>
            <td class="table-dark">${usuario.Contraseña}</td>
            <td class="table-dark">${usuario.IdCliente}</td>
            <td class="table-dark"><button type="submit" class="btn btn-danger btnDelete">Eliminar</button></td>
            <td class="table-dark"><button type="submit" class="btn btn-success btnEditar">Editar</button></td>
        </tr>`
    })
    contenedor.innerHTML = resultado
}
const token = sessionStorage.getItem('Token');

fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: token,
    },
    })
    .then((response) => response.json())
    .then((data) => CargaUsuario(data))
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
        title: '¿Estás seguro de que deseas eliminar este Usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
        fila = e.target.parentNode.parentNode
        const codigoU = fila.firstElementChild.innerHTML
        fetch(url + "/" + codigoU, {
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
                    NombreDeUsuario:NombreDeUsuario.value,
                    Contraseña:Contraseña.value,
                    IdCliente:IdCliente.value,
                })
        })
    .then(response => response.json())
    .then (data => {
        const nuevo_usuario = []
        nuevo_usuario.push(data)
    })
    
    }
    if (operacion == "modificar"){ 
        fetch(url + '/' + id_form ,{method: "PUT",
                    headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        },
                    body: JSON.stringify({
                        NombreDeUsuario:NombreDeUsuario.value,
                        Contraseña:Contraseña.value,
                        IdCliente:IdCliente.value,
                    })
            })
        .then(response => response.json())
        .then (data => {
            const nuevo_usuario = []
            nuevo_usuario.push(data)
        })
        
        }
})

//              Modificacion de datos mandados al formulario de la tabla

let id_form = 0
on (document, 'click', '.btnEditar', e => { 
    console.log("Edicion realizada")
    const fila = e.target.parentNode.parentNode
    id_form = fila.children[0].innerHTML
        const fNombreDeUsuario = fila.children[1].innerHTML
        const fContraseña = fila.children[2].innerHTML
        const fIdCliente = fila.children[3].innerHTML

        NombreDeUsuario.value = fNombreDeUsuario
        Contraseña.value = fContraseña
        IdCliente.value = fIdCliente

    operacion = "modificar"
})

const form = document.querySelector('#formpro');
const nombreUsuario = document.querySelector('#NombreDeUsuario');
const contraseña = document.querySelector('#Contraseña');
const idCliente = document.querySelector('#IdCliente');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (nombreUsuario.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un nombre de usuario.'
        });
        return;
    }

    if (contraseña.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese una contraseña.'
        });
        return;
    }

    if (idCliente.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un ID de cliente.'
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
