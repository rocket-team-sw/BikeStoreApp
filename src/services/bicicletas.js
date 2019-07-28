import axios from 'axios'

import { environment } from '../config/environment'

/**
 * Método para obtener bicicletas con paginación
 * @param {*} limit Número total de bicicletas a recibir
 * @param {*} offset Número de bicicletas después del inicio
 */
export const paginarBicicletas = async (limit, offset) => {
  const url = `${environment.url}/bicicletas/paginar/${limit}/${offset}`
  console.log(url)
  return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}

/**
 * Método para buscar bicicletas por fragmento de texto, con paginación
 * @param {*} query fragmento de texto a buscar en bicicletas
 * @param {*} limit Número total de bicicletas a recibir
 * @param {*} offset Número de bicicletas después del inicio
 */
export const buscarBicicletas = async (query, limit, offset) => await axios.get(`${environment.url}/bicicletas/buscar/${limit}/${offset}`)