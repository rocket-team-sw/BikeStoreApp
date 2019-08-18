import { AsyncStorage } from 'react-native'

const CLAVE_CARRITO = '@Bikestore:carrito'

/**
 * Método para guardar el carrito en el almacenamiento interno del dispositivo
 * @param carrito mapa del carrito a guardar
 * @returns Boolean, true si se guardó con éxito, sino, false
 */
export const guardarCarrito = async (carrito) => {
	try {
		await AsyncStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
		return true
	} catch(error) {
		console.log(error)
		alert("Hubo un error guardando el carrito en el almacenamiento interno")
		return false
	}
}

/**
 * Método para leer los datos del carrito guardados en el almacenamiento interno
 * @returns Mapa con los datos del carrito si había algo, si o hay nada o hubo error, null
 */
export const cargarCarrito = async () => {
	try {
		const guardado = await AsyncStorage.getItem(CLAVE_CARRITO)
		if (guardado !== null) {
			return JSON.parse(guardado)
		}
		return null
	} catch(error) {
		console.log(error)
		alert("Hubo un error leyendo los datos del almacenamiento interno")
	}
}