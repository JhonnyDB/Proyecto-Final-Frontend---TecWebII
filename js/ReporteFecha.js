
// const url = 'http://localhost:3000/reportes/2023-01-10/2023-03-10' 

// const contenedor = document.getElementById ('data')
// let resultado = ''

// //              Mostrar datos de la tabla

// const CargaReporteF = (reportes)=>{
//     reportes.forEach( reporteF => {
//         resultado += 
//         `<tr>
//             <td class="table-dark">${reporteF.IdCliente}</td>
//             <td class="table-dark">${reporteF.NombreCliente}</td>
//             <td class="table-dark">${reporteF.ApellidoCliente}</td>
//             <td class="table-dark">${reporteF.Direccion}</td>
//             <td class="table-dark">${reporteF.Celular}</p>
//             <td class="table-dark">${reporteF.Email}</td>
//             <td class="table-dark">${reporteF.IdUsuario }</td>
//             <td class="table-dark">${reporteF.NombreDeUsuario}</td>
//             <td class="table-dark">${reporteF.NumPago}</td>
//             <td class="table-dark">${reporteF.Fecha}</td>
//             <td class="table-dark">${reporteF.ModoDePago}</td>
//             <td class="table-dark">${reporteF.NombreProducto}</td>
//             <td class="table-dark">${reporteF.PrecioU}</td>
//             <td class="table-dark">${reporteF.Cantidad}</td>
//             <td class="table-dark">${reporteF.Monto}</td>
//         </tr>`
//     })
//     contenedor.innerHTML = resultado
// }
// const token = sessionStorage.getItem('Token');

// fetch(url, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//     },
//     })
//     .then((response) => response.json())
//     .then((data) => CargaReporteF(data))
//     .catch((error) => console.log(error));
//     const on = (element, event, selector, handler) => {
//         element.addEventListener(event, (e) => {
//             if (e.target.closest(selector)) {
//             handler(e);
//             }
//         });
//     };

const form = document.getElementById('form-reporte');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFin = document.getElementById('fecha-fin').value;

    const url = `http://localhost:3000/reportes/${fechaInicio}/${fechaFin}`;

    const contenedor = document.getElementById('data');
    let resultado = '';

    const CargaReporteF = (reportes) => {
    reportes.forEach((reporteF) => {
        resultado += `
        <tr>
            <td class="table-dark">${reporteF.IdCliente}</td>
            <td class="table-dark">${reporteF.NombreCliente}</td>
            <td class="table-dark">${reporteF.ApellidoCliente}</td>
            <td class="table-dark">${reporteF.Direccion}</td>
            <td class="table-dark">${reporteF.Celular}</td>
            <td class="table-dark">${reporteF.Email}</td>
            <td class="table-dark">${reporteF.IdUsuario}</td>
            <td class="table-dark">${reporteF.NombreDeUsuario}</td>
            <td class="table-dark">${reporteF.NumPago}</td>
            <td class="table-dark">${reporteF.Fecha}</td>
            <td class="table-dark">${reporteF.ModoDePago}</td>
            <td class="table-dark">${reporteF.NombreProducto}</td>
            <td class="table-dark">${reporteF.PrecioU}</td>
            <td class="table-dark">${reporteF.Cantidad}</td>
            <td class="table-dark">${reporteF.Monto}</td>
        </tr>`;
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
    .then((data) => CargaReporteF(data))
    .catch((error) => console.log(error));
});

function logout() {
    sessionStorage.removeItem("Token");
}
