let inputs = null
let form = null
let button = null

const regExpValidar = [
    /^.+$/, // rexexp nombre 
    /^[0-9]+$/, // rexexp precio
    /^[0-9]+$/, // rexexp stock
    /^.+$/, // rexexp marca
    /^.+$/, // rexexp categoría
    /^.+$/, // rexexp detalles
    /^.+$/ // rexexp foto
]

const camposValidos = [false, false, false, false, false, false]

const algunCampoNoValido = () => {
    let valido = 
        camposValidos[0] &&
        camposValidos[1] &&
        camposValidos[2] &&
        camposValidos[3] &&
        camposValidos[4] &&
        camposValidos[5] 
    
    return !valido
}

const setCustomValidity = function (mensaje, index) {
    const errorDivs = document.querySelectorAll('div.error-detail')
    
    errorDivs[index].innerHTML = mensaje
    
}

function validar(valor, validador, index) {

    if (!validador.test(valor)) {
        setCustomValidity('Este campo no es válido', index)
        camposValidos[index] = false
        button.disabled = true
        return null
    }

    camposValidos[index] = true
    button.disabled = algunCampoNoValido()
    setCustomValidity('', index)
    return valor
}

function renderProds(productos) {

    fetch('vistas/alta.hbs')
    .then(r => r.text())
    .then(plantilla => {

        var template = Handlebars.compile(plantilla)
    
        let html = template({productos: productos})
    
        document.querySelector('.listado-productos').innerHTML = html
    })

}

function leerProductoIngresado() {
    return {
        nombre: inputs[0].value,
        precio: inputs[1].value,
        stock: inputs[2].value,
        marca: inputs[3].value,
        foto: inputs[4].value,
        detalles: inputs[5].value,
        envio: inputs[6].checked
    }
}

function limpiarFormulario() {
    // inicializo los campos del formulario
    inputs.forEach((input) => {
        input.type == 'checkbox'? input.checked = false : input.value = ''
    })

    button.disabled = true
    for (let i = 0; i < camposValidos.length; i++) {
        camposValidos[i] = false
        
    }
}

async function initAlta() {
    console.warn('initAlta')

    inputs = document.querySelectorAll('.form-section__info-input')
    form = document.querySelector('.main-form')
    button = document.querySelector('button')
    
    button.disabled = true
    
    productosModel.inicializar(await productosController.obtenerProductos()) 
    renderProds(productosModel.obtener())

    inputs.forEach((input, index) => {
        if(input.type != 'checkbox'){
            input.addEventListener('input', () => {
                validar(input.value, regExpValidar[index], index)
            })
        }
    })

    form.addEventListener('submit', async e => {
        e.preventDefault()
    
        let producto = leerProductoIngresado()
        limpiarFormulario()

        await productosController.guardarProducto(producto)
        
    })
}