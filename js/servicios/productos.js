class ProductosService {

    url_Productos = 'https://61e81175e32cd90017acbfe8.mockapi.io/productos/'

    async obtenerProductos() {
        let productos = await http.get(this.url_Productos)
        return productos
    }

    async guardarProducto(producto) {
        let productoGuardado = await http.post(this.url_Productos, producto)
        return productoGuardado
    }

    async actualizarProducto(id, producto) {
        let productoActualizado = await http.put(this.url_Productos, id, producto)
        return productoActualizado
    }

    async borrarProducto(id) {
        let productoBorrado = await http.delete(this.url_Productos, id)
        return productoBorrado
    }

}

const productosService = new ProductosService()