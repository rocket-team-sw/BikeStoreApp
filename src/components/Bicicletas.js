import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import ItemBicicleta from './ItemBicicleta'

import { colors } from '../utils/colors'
import { paginarBicicletas } from '../services/bicicletas'

const LIMIT = 10

/**
 * Clase para presentar lista de bicicletas
 * @author juanfvasquez
 * 20-Jul-2019
 */
class Bicicletas extends Component {

  state = {
    bicicletas: [],
    pagina: 0
  }

  /**
   * Método que se ejecutará al iniciar el componente
   */
  componentWillMount() {
    this.cargarBicicletas(0)
  }

  /**
   * Método para cargar bicicletas teniendo en cuenta la paginación
   */
  cargarBicicletas = async (pagina) => {
    const response = await paginarBicicletas(LIMIT, pagina * LIMIT)
    if (response.status === 200) {
      const bicicletas = response.data.list
      this.setState({ bicicletas })
    }
  }

	/**
	 * Método para navegar hacia la página de detalle de la bicicleta
	 * cuando se presiona
	 */
	abrirBicicleta = bicicleta => () => {
  	const { navigation } = this.props
		navigation.navigate('Bicicleta', { bicicleta })
	}

  /**
   * Método para renderizar la lista de bicicletas
   */
  renderBicicletas = ({ item }) => (
    <ItemBicicleta bicicleta={item} abrirBicicleta={this.abrirBicicleta(item).bind(this)}/>
  )

  /**
   * Método para obtener las bicicletas con paginación, variando la página
   */
  siguientePagina = () => {
    const pagina = this.state.pagina + 1
    this.setState({ pagina })
    this.cargarBicicletas(pagina)
		this.scrollView.scrollTo({ x: 0, y: 0 })
  }

  /**
   * Método para obtener las bicicletas con paginación, variando la página
   */
  anteriorPagina = () => {
		const pagina = this.state.pagina - 1
    this.setState({ pagina })
    this.cargarBicicletas(pagina)
		this.scrollView.scrollTo({ x: 0, y: 0 })
  }

  /**
   * Método para navegar a la pantalla de búsqueda
   */
  abrirBusqueda = () => {
    const { navigation } = this.props
    navigation.navigate('Buscar')
  }

	/**
	 * Método para navegar a la pantalla de Carrito
	 */
  abrirCarrito = () => {
		const { navigation } = this.props
		navigation.navigate('Carrito')
	}

  render() {
    const { bicicletas, pagina } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
					<TouchableOpacity onPress={this.abrirBusqueda}>
						<Icon name="md-search" size={27} color="#fff" />
					</TouchableOpacity>
					<Text style={styles.titulo}>Nuestros Productos</Text>
					<TouchableOpacity onPress={this.abrirCarrito}>
						<Icon name="md-cart" size={27} color="#fff" />
					</TouchableOpacity>
        </View>
        <ScrollView style={styles.containerBicicletas} ref={ref => this.scrollView = ref}>
          <FlatList
            data={bicicletas}
            renderItem={this.renderBicicletas}
            keyExtractor={(item, index) => `${item.id}`}
            ItemSeparatorComponent={() => (<View style={styles.separador} />)}
          />
          <View style={styles.barraPaginacion}>
						{ pagina > 0 && <TouchableOpacity style={styles.boton} onPress={this.anteriorPagina}>
              <Text style={styles.textoBoton}>Anterior</Text>
            </TouchableOpacity>}
						{ bicicletas.length === LIMIT && <TouchableOpacity style={styles.boton} onPress={this.siguientePagina}>
              <Text style={styles.textoBoton}>Siguiente</Text>
            </TouchableOpacity>}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  titulo: {
    fontSize: 19,
    color: '#fff',
    fontWeight: 'bold'
  },
  containerBicicletas: {
    marginTop: 70,
  },
  boton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  textoBoton: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff'
  },
  barraPaginacion: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default Bicicletas
