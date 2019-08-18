import { SET_CARRITO } from './types'

/**
 * Acción para cambiar el carrito en el store de redux
 * @param carrito mapa de las bicicletas en el carrito
 * @returns objeto que usará el reducer para cambiar el carrito
 */
export const setCarrito = carrito => ({
    type: SET_CARRITO,
    payload: { carrito }
})
