
const url = 'http://localhost:3000/categoria' 
const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargaCategoria = (categorias)=>{
    categorias.forEach( categoria => {
        resultado += 
        `<tr>
            <td class="table-dark">${categoria.IdCategoria}</td>
            <td class="table-dark">${categoria.DescripcionCategoria}</td>
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
    .then((data) => CargaCategoria(data))
    .catch((error) => console.log(error));
    const on = (element, event, selector, handler) => {
        element.addEventListener(event, (e) => {
            if (e.target.closest(selector)) {
            handler(e);
            }
        });
    };

//              Eliminacion de datos de la tabla 

on (document, 'click', '.btnDelete', (e) => { 
    console.log("Eliminacion realizada")
    fila = e.target.parentNode.parentNode
    const codigoCa = fila.firstElementChild.innerHTML
    fetch(url + "/" + codigoCa, {
        method: "DELETE",
        headers: {
            Authorization: token,
        }
    })
    .then(response => response.json())
    .then(() => location.reload ())
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
                    DescripcionCategoria:DescripcionCategoria.value,
                })
        })
    .then(response => response.json())
    .then (data => {
        const nueva_categoria = []
        nueva_categoria.push(data)
    })
    .then(() => location.reload ()) 
    }
    if (operacion == "modificar"){ 
        fetch(url + '/' + id_form ,{method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            },
                    body: JSON.stringify({
                        DescripcionCategoria:DescripcionCategoria.value,
                    })
            })
        .then(response => response.json())
        .then (data => {
            const nueva_categoria = []
            nueva_categoria.push(data)
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
        const fDescripcionCategoria = fila.children[1].innerHTML

        DescripcionCategoria.value = fDescripcionCategoria

    operacion = "modificar"
})
