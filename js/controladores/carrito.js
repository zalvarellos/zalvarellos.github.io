class CarritoController {

    constructor() {
        try {
            carritoModel.inicializar( JSON.parse( localStorage.getItem('carrito' ) ) || [] )
        }
        catch {
            carritoModel.inicializar( [] )
            localStorage.setItem('carrito', carritoModel.obtener())
        }
    }

    async agregarAlCarrito(producto) {
        if(!carritoModel.productoExiste(producto)){
            producto.cantidad = 1
            carritoModel.guardar(producto)
        }
        else{
            let productoDeCarrito = carritoModel.obtenerProducto(producto)
            productoDeCarrito.cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(carritoModel.obtener()))
        
        await renderCarrito(carritoModel.obtener())
    }
    
    async borrarProducto(id) {
        // console.log('borrarProducto', id);
        
        carritoModel.borrar(id)
        localStorage.setItem('carrito', JSON.stringify(carritoModel.obtener()))

        await renderCarrito(carritoModel.obtener())
    }

    async enviarCarrito() {
        // console.log('Enviando carrito');

        // Envio carrito al backend
        let elemSectionCarrito = document.querySelector('.section-carrito')

        elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
        
        await carritoService.guardarCarrito(carritoModel.obtener())

        elemSectionCarrito.innerHTML = '<h2>Enviando carrito... <b>OK!</b></h2>'

        // Borrando carrito del modelo y del localStorage
        carritoModel.inicializar([])
        localStorage.setItem('carrito', carritoModel.obtener())

        // cierro la ventana del menu del carrito luego de un tiempo
        setTimeout(() => {
            elemSectionCarrito.classList.remove('section-carrito--visible')
            mostrarCarrito = false
        }, 1500)
    }
}

const carritoController = new CarritoController()