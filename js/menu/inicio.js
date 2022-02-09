function renderCards(productos) {

    fetch('vistas/inicio.hbs')
    .then(r => r.text())
    .then(plantilla => {

        var template = Handlebars.compile(plantilla)
    
        let html = template({productos: productos})
    
        document.querySelector('.cards-container').innerHTML = html
    })

}

function agregarAlCarrito(id) {
    let producto = productosModel.obtener(id)

    carritoController.agregarAlCarrito(producto)
}

async function initInicio() {
    console.warn('initInicio')

    productosModel.inicializar(await productosController.obtenerProductos()) 
    let productos = productosModel.obtener()

    renderCards(productos)

    let lg = productos.length
    document.querySelector('.section-cards__header p').innerHTML = lg? `Se encontraron ${lg} productos` : ''
}

