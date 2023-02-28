
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
            <td class="table-dark">${detalle.PrecioUnitario}</td>
            <td class="table-dark">${detalle.IdProducto}</td>
            <td class="table-dark"><button type="submit" class="btn btn-danger btnDelete">Eliminar</button></td>
            <td class="table-dark"><button type="submit" class="btn btn-success btnEditar">Editar</button></td>
        </tr>`
    })
    contenedor.innerHTML = resultado
}
fetch(url)  
    .then(response => response.json())
    .then(data => CargaDetalle (data))
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
                    Cantidad:Cantidad.value,
                    PrecioUnitario:PrecioUnitario.value,
                    IdProducto:IdProducto.value,
                })
        })
    .then(response => response.json())
    .then (data => {
        const nuevo_detalle = []
        nuevo_detalle.push(data)
    })
    .then(() => location.reload ()) 
    }
    if (operacion == "modificar"){ 
        fetch(url + '/' + id_form ,{method: "PUT",
                    headers: {"Content-type":"application/json"},
                    body: JSON.stringify({
                        Cantidad:Cantidad.value,
                        PrecioUnitario:PrecioUnitario.value,
                        IdProducto:IdProducto.value,
                    })
            })
        .then(response => response.json())
        .then (data => {
            const nuevo_detalle = []
            nuevo_detalle.push(data)
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
        const fCantidad = fila.children[1].innerHTML
        const fPrecioUnitario = fila.children[2].innerHTML
        const fIdProducto = fila.children[3].innerHTML

        Cantidad.value = fCantidad
        PrecioUnitario.value = fPrecioUnitario
        IdProducto.value = fIdProducto

    operacion = "modificar"
})
