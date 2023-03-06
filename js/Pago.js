
const url = 'http://localhost:3000/pago' 
const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargaPago = (pagos)=>{
    pagos.forEach( pago => {
        resultado += 
        `<tr>
            <td class="table-dark">${pago.NumPago}</td>
            <td class="table-dark">${pago.Fecha}</td>
            <td class="table-dark">${pago.ModoDePago}</td>
            <td class="table-dark">${pago.IdUsuario}</td>
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
    .then((data) => CargaPago(data))
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
        title: '¿Estás seguro de que deseas eliminar este Pago?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
        fila = e.target.parentNode.parentNode
        const codigoPa = fila.firstElementChild.innerHTML
        fetch(url + "/" + codigoPa, {
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
                    Fecha:Fecha.value,
                    ModoDePago:ModoDePago.value,
                    IdUsuario:IdUsuario.value,
                })
        })
    .then(response => response.json())
    .then (data => {
        const nuevo_pago = []
        nuevo_pago.push(data)
    })
    
    }
    if (operacion == "modificar"){ 
        fetch(url + '/' + id_form ,{method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            },
                    body: JSON.stringify({
                        Fecha:Fecha.value,
                        ModoDePago:ModoDePago.value,
                        IdUsuario:IdUsuario.value,
                    })
            })
        .then(response => response.json())
        .then (data => {
            const nuevo_pago = []
            nuevo_pago.push(data)
        })
        
        }
})

//              Modificacion de datos mandados al formulario de la tabla

let id_form = 0
on (document, 'click', '.btnEditar', e => { 
    console.log("Edicion realizada")
    const fila = e.target.parentNode.parentNode
    id_form = fila.children[0].innerHTML
        const fFecha = fila.children[1].innerHTML
        const fModoDePago = fila.children[2].innerHTML
        const fIdUsuario = fila.children[3].innerHTML

        Fecha.value = fFecha
        ModoDePago.value = fModoDePago
        IdUsuario.value = fIdUsuario

    operacion = "modificar"
})

function obtenerFechaString(Fecha) {
    var year = Fecha.getFullYear();
    var month = Fecha.getMonth() + 1;
    var day = Fecha.getDate();
    

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    
    return year + "-" + month + "-" + day;
}

var inputFecha = document.getElementById("Fecha");
var seleccionFecha = document.getElementById("seleccion-Fecha");

inputFecha.addEventListener("change", function() {
    var Fecha = new Date(inputFecha.value);
    seleccionFecha.innerHTML = "Fecha seleccionada: " + obtenerFechaString(Fecha);
});

const form = document.querySelector('#formpro');
const fecha = document.querySelector('#Fecha');
const mododepago = document.querySelector('#ModoDePago');
const idusuario = document.querySelector('#IdUsuario');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (fecha.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese una Fecha para el Pago.'
        });
        return;
    }

    if (mododepago.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un Modo de pago.'
        });
        return;
    }

    if (idusuario.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese el Id de Usuario.'
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
