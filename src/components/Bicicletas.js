import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import ItemBicicleta from './ItemBicicleta'

import { colors } from '../utils/colors'
import { bicicletas } from '../datos/bicicletas'
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
    this.cargarBicicletas()
    this.setState({ bicicletas })
  }

  /**
   * Método para cargar bicicletas teniendo en cuenta la paginación
   */
  cargarBicicletas = async () => {
    // const { pagina } = this.state
    // const response = await paginarBicicletas(LIMIT, pagina * LIMIT)
    // console.log(response)
    // if (response.status === 200) {
    //   const bicicletas = response.data.list
    //   this.setState({ bicicletas })
    // }
  }

  /**
   * Método para renderizar la lista de bicicletas
   */
  renderBicicletas = ({ item }) => (
    <ItemBicicleta bicicleta={item} />
  )

  /**
   * Método para obtener las bicicletas con paginación, variando la página
   */
  siguientePagina = () => {
    const { pagina } = this.state
    this.setState({ pagina: pagina + 1 })
    this.cargarBicicletas()
  }

  /**
   * Método para obtener las bicicletas con paginación, variando la página
   */
  anteriorPagina = () => {
    const { pagina } = this.state
    this.setState({ pagina: pagina - 1 })
    this.cargarBicicletas()
  }

  /**
   * Método para navegar a la pantalla de búsqueda
   */
  abrirBusqueda = () => {
    const { navigation } = this.props
    navigation.navigate('Buscar')
  }

  render() {
    const { bicicletas } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Nuestros Productos</Text>
          <TouchableOpacity onPress={this.abrirBusqueda}>
            <Icon name="md-search" size={27} color="#fff" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.containerBicicletas} ref={ref => this.scrollView = ref}>
          <FlatList
            data={bicicletas}
            renderItem={this.renderBicicletas}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={() => (<View style={styles.separador} />)}
          />
          <View style={styles.barraPaginacion}>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.textoBoton}>Anterior</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.textoBoton}>Siguiente</Text>
            </TouchableOpacity>
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
    marginTop: 60,
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