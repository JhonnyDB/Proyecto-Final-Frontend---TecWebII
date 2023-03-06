
const url = 'http://localhost:3000/producto' 
const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargaProducto = (productos)=>{
    let resultado = ""
    productos.forEach( producto => {
        resultado += 
        `<tr>
            <td class="table-dark">${producto.IdProducto}</td>
            <td class="table-dark">${producto.NombreProducto}</td>
            <td class="table-dark">${producto.Marca}</td>
            <td class="table-dark">${producto.PrecioU}</td>
            <td class="table-dark">${producto.Stock}</td>
            <td class="table-dark">${producto.IdCategoria}</td>
            <td class="table-dark"><img src="${producto.UrlImagen}" alt="Imagen" width ="300" height ="185"></td>
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
    .then((data) => CargaProducto(data))
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
        title: '¿Estás seguro de que deseas eliminar este Producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
        fila = e.target.parentNode.parentNode
        const codigoPr = fila.firstElementChild.innerHTML
        fetch(url + "/" + codigoPr, {
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
const formpro = document.getElementById("formpro")

formpro.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(formpro)
    formData.append("Imagen", document.getElementById("Imagen").files[0])

    if (operacion === "adicionar") {
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: token
            },
            body: formData
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
            })
    } else if (operacion === "modificar") {
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: token
            },
            body: formData
        }

        fetch(`${url}/${id_form}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
            })
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
    const fImagen = fila.children[6].querySelector('img').getAttribute('src');

    NombreProducto.value = fNombreProducto
    Marca.value = fMarca
    PrecioU.value = fPrecioU
    Stock.value = fStock
    IdCategoria.value = fIdCategoria
    
    const imagenPreview = document.getElementById('imagenProductoPreview');
    imagenPreview.setAttribute('src', fImagen);
    operacion = "modificar"
})

const inputImagen = document.getElementById("Imagen")
const imagenPreview = document.getElementById("imagenProductoPreview")

inputImagen.addEventListener("change", (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.addEventListener("load", (event) => {
        imagenPreview.src = event.target.result
    })

    reader.readAsDataURL(file)
})


const form = document.querySelector('#formpro');
const nombreproducto = document.querySelector('#NombreProducto');
const marca = document.querySelector('#Marca');
const preciou = document.querySelector('#PrecioU');
const stock = document.querySelector('#Stock');
const idcategoria = document.querySelector('#IdCategoria');
const imagen = document.querySelector('#Imagen');



form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (nombreproducto.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese un Nombre para el producto.'
        });
        return;
    }

    if (marca.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese una marca.'
        });
        return;
    }

    if (preciou.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese el precio.'
        });
        return;
    }
    if (stock.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese el stock.'
        });
        return;
    }
    if (idcategoria.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese el Id de categoria.'
        });
        return;
    }
    if (imagen.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese una imagen.'
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
