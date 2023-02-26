
const url = 'http://localhost:3000/producto' 
const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargaProducto = (productos)=>{
    productos.forEach( producto => {
        resultado += 
        `<tr>
            <td class="table-dark">${producto.IdProducto}</td>
            <td class="table-dark">${producto.NombreProducto}</td>
            <td class="table-dark">${producto.Marca}</td>
            <td class="table-dark">${producto.PrecioU}</td>
            <td class="table-dark">${producto.Stock}</td>
            <td class="table-dark">${producto.IdCategoria}</td>
            <td class="table-dark"><button type="submit" class="btn btn-danger btnDelete">Eliminar</button></td>
            <td class="table-dark"><button type="submit" class="btn btn-success btnEditar">Editar</button></td>
        </tr>`
    })
    contenedor.innerHTML = resultado
}
fetch(url)  
    .then(response => response.json())
    .then(data => CargaProducto (data))
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
    const codigoPr = fila.firstElementChild.innerHTML
    fetch(url + "/" + codigoPr, {method: "DELETE"})
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
                    NombreProducto:NombreProducto.value,
                    Marca:Marca.value,
                    PrecioU:PrecioU.value,
                    Stock:Stock.value,
                    IdCategoria:IdCategoria.value,
                })
        })
    .then(response => response.json())
    .then (data => {
        const nuevo_producto = []
        nuevo_producto.push(data)
    })
    .then(() => location.reload ()) 
    }
    if (operacion == "modificar"){ 
        fetch(url + '/' + id_form ,{method: "PUT",
                    headers: {"Content-type":"application/json"},
                    body: JSON.stringify({
                        NombreProducto:NombreProducto.value,
                        Marca:Marca.value,
                        PrecioU:PrecioU.value,
                        Stock:Stock.value,
                        IdCategoria:IdCategoria.value,
                    })
            })
        .then(response => response.json())
        .then (data => {
            const nuevo_producto = []
            nuevo_producto.push(data)
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
        const fNombreProducto = fila.children[1].innerHTML
        const fMarca = fila.children[2].innerHTML
        const fPrecioU = fila.children[3].innerHTML
        const fStock = fila.children[4].innerHTML
        const fIdCategoria = fila.children[5].innerHTML

        NombreProducto.value = fNombreProducto
        Marca.value = fMarca
        PrecioU.value = fPrecioU
        Stock.value = fStock
        IdCategoria.value = fIdCategoria

    operacion = "modificar"
})
