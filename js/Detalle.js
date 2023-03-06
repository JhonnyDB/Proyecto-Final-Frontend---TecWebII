
const url = 'http://localhost:3000/detalle' 
const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargaDetalle = (detalles)=>{
    detalles.forEach( detalle => {
        resultado += 
        `<tr>
            <td class="table-dark">${detalle.NumDetalle}</td>
            <td class="table-dark">${detalle.Cantidad}</td>
            <td class="table-dark">${detalle.IdProducto}</td>
            <td class="table-dark">${detalle.NumPago}</td>
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
    .then((data) => CargaDetalle(data))
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
        title: '¿Estás seguro de que deseas eliminar este Detalle?',
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
                    Cantidad:Cantidad.value,
                    IdProducto:IdProducto.value,
                    NumPago:NumPago.value,
                })
        })
    .then(response => response.json())
    .then (data => {
        const nuevo_detalle = []
        nuevo_detalle.push(data)
    })
    
    }
    if (operacion == "modificar"){ 
        fetch(url + '/' + id_form ,{method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            },
                    body: JSON.stringify({
                        Cantidad:Cantidad.value,
                        IdProducto:IdProducto.value,
                        NumPago:NumPago.value,
                    })
            })
        .then(response => response.json())
        .then (data => {
            const nuevo_detalle = []
            nuevo_detalle.push(data)
        })
        
        }
})

//              Modificacion de datos mandados al formulario de la tabla

let id_form = 0
on (document, 'click', '.btnEditar', e => { 
    console.log("Edicion realizada")
    const fila = e.target.parentNode.parentNode
    id_form = fila.children[0].innerHTML
        const fCantidad = fila.children[1].innerHTML
        const fIdProducto = fila.children[2].innerHTML
        const fNumPago = fila.children[3].innerHTML

        Cantidad.value = fCantidad
        IdProducto.value = fIdProducto
        NumPago.value = fNumPago

    operacion = "modificar"
})


const form = document.querySelector('#formpro');
const cantidad = document.querySelector('#Cantidad');
const idproducto = document.querySelector('#IdProducto');
const numpago = document.querySelector('#NumPago');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (cantidad.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un Cantidad para el detalle.'
        });
        return;
    }

    if (idproducto.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese el id del producto.'
        });
        return;
    }

    if (numpago.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese el numero de pago.'
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
