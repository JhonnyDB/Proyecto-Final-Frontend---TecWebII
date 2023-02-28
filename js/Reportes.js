
//const url = 'http://localhost:3000/reportes/1' 
const url = 'http://localhost:3000/reportes/' 
const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargaReporte = (reportes)=>{
    reportes.forEach( reporte => {
        resultado += 
        `<tr>
            <td class="table-dark">${reporte.IdCliente}</td>
            <td class="table-dark">${reporte.NombreCliente}</td>
            <td class="table-dark">${reporte.Direccion}</td>
            <td class="table-dark">${reporte.Email}</td>
            <td class="table-dark">${reporte.IdUsuario}</p>
            <td class="table-dark">${reporte.NombreDeUsuario}</td>
            <td class="table-dark">${reporte.Fecha }</td>
            <td class="table-dark">${reporte.ModoDePago}</td>
            <td class="table-dark">${reporte.NombreProducto}</td>
            <td class="table-dark">${reporte.PrecioU}</td>
            <td class="table-dark">${reporte.Cantidad}</td>
            <td class="table-dark">${reporte.Monto}</td>
        </tr>`
    })
    contenedor.innerHTML = resultado
}
fetch(url)  
    .then(response => response.json())
    .then(data => CargaReporte (data))
    .catch(error => console.log(error))    
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
} 

