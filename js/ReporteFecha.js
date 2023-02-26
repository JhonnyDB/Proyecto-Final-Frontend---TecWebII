
const url = 'http://localhost:3000/reportes/2023-01-01/2023-02-20' 

const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargaReporteF = (reportes)=>{
    reportes.forEach( reporteF => {
        resultado += 
        `<tr>
            <td class="table-dark">${reporteF.IdCliente}</td>
            <td class="table-dark">${reporteF.NombreCliente}</td>
            <td class="table-dark">${reporteF.ApellidoCliente}</td>
            <td class="table-dark">${reporteF.Direccion}</td>
            <td class="table-dark">${reporteF.Celular}</p>
            <td class="table-dark">${reporteF.Email}</td>
            <td class="table-dark">${reporteF.IdUsuario }</td>
            <td class="table-dark">${reporteF.NombreDeUsuario}</td>
            <td class="table-dark">${reporteF.NumPago}</td>
            <td class="table-dark">${reporteF.Fecha}</td>
            <td class="table-dark">${reporteF.ModoDePago}</td>
            <td class="table-dark">${reporteF.NombreProducto}</td>
            <td class="table-dark">${reporteF.PrecioU}</td>
            <td class="table-dark">${reporteF.Cantidad}</td>
            <td class="table-dark">${reporteF.Monto}</td>
        </tr>`
    })
    contenedor.innerHTML = resultado
}
fetch(url)  
    .then(response => response.json())
    .then(data => CargaReporteF (data))
    .catch(error => console.log(error))    
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
} 

let operacion = "adicionar"

fecha.addEventListener("submit", (e) => {
    e.preventDefault()
    if (operacion == "adicionar"){ 
    fetch(url, {method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({
                    Cantidad:Cantidad.value,
                    PrecioTotal:PrecioTotal.value,
                    IdProducto:IdProducto.value,
                    NumPago:NumPago.value,
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
                        PrecioTotal:PrecioTotal.value,
                        IdProducto:IdProducto.value,
                        NumPago:NumPago.value,
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
