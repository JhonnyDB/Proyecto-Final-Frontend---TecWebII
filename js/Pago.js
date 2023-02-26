
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
            <td class="table-dark">${pago.IdProducto}</td>
            <td class="table-dark"><button type="submit" class="btn btn-danger btnDelete">Eliminar</button></td>
            <td class="table-dark"><button type="submit" class="btn btn-success btnEditar">Editar</button></td>
        </tr>`
    })
    contenedor.innerHTML = resultado
}
fetch(url)  
    .then(response => response.json())
    .then(data => CargaPago (data))
    .catch(error => console.log(error))    
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
} 

//              Eliminacion de datos de la tabla 

on (document, 'click', '.btnDelete', (e) => { 
    console.log("Eliminacion realizada")
    fila = e.target.parentNode.parentNode
    const codigoPa = fila.firstElementChild.innerHTML
    fetch(url + "/" + codigoPa, {method: "DELETE"})
    .then(response => response.json())
    .then(() => location.reload ())
})

//                 Agregar datos de la tabla

let operacion = "adicionar"

formpro.addEventListener("submit", (e) => {
    e.preventDefault()
    if (operacion == "adicionar"){ 
    fetch(url, {method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({
                    Fecha:Fecha.value,
                    ModoDePago:ModoDePago.value,
                    IdUsuario:IdUsuario.value,
                    IdProducto:IdProducto.value,
                })
        })
    .then(response => response.json())
    .then (data => {
        const nuevo_pago = []
        nuevo_pago.push(data)
    })
    .then(() => location.reload ()) 
    }
    if (operacion == "modificar"){ 
        fetch(url + '/' + id_form ,{method: "PUT",
                    headers: {"Content-type":"application/json"},
                    body: JSON.stringify({
                        Fecha:Fecha.value,
                        ModoDePago:ModoDePago.value,
                        IdUsuario:IdUsuario.value,
                        IdProducto:IdProducto.value,
                    })
            })
        .then(response => response.json())
        .then (data => {
            const nuevo_pago = []
            nuevo_pago.push(data)
        })
        .then(() => location.reload ()) 
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
        const fIdProducto = fila.children[4].innerHTML

        Fecha.value = fFecha
        ModoDePago.value = fModoDePago
        IdUsuario.value = fIdUsuario
        IdProducto.value = fIdProducto

    operacion = "modificar"
})