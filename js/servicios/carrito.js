class CarritoService {
    url_Carrito = 'https://61e81175e32cd90017acbfe8.mockapi.io/carrito/'

    async guardarCarrito(carrito) {
        let carritoGuardado = await http.post(this.url_Carrito, carrito)

        return carritoGuardado
    }

}

const carritoService = new CarritoService()