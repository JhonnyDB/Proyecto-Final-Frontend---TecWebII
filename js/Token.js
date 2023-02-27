const url = 'http://localhost:3000/token'

const contenedor = document.getElementById ('data')
let resultado = ''

//              Mostrar datos de la tabla

const CargarToken = (tokens)=>{
    tokens.forEach( token => {
        resultado += 
        `<tr>
            <td class="table-dark">${token.NombreDeUsuario}</td>
            <td class="table-dark">${token.Contraseña}</td>
        </tr>`
    })
    contenedor.innerHTML = resultado
}
fetch(url)  
    .then(response => response.json())
    .then(data => CargarToken (data))
    .catch(error => console.log(error))    
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
} 

//                 Agregar datos de la tabla

let operacion = "adicionar"

formpro.addEventListener("submit", (e) => {
    e.preventDefault()
    if (operacion == "adicionar"){ 
    fetch(url, {method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({
                    NombreDeUsuario:NombreDeUsuario.value,
                    Contraseña:Contraseña.value,
                })
        })
        try {
            
        } catch (error) {
            
        }
            window.location.href = '../Index.html' 
    }
})


