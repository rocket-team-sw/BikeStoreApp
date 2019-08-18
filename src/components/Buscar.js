import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import ItemBicicleta from './ItemBicicleta'

import { colors } from '../utils/colors'
import { bicicletas } from '../datos/bicicletas'
import { buscarBicicletas } from '../services/bicicletas'

const LIMIT = 10

/**
 * Clase para presentar lista de bicicletas obtenidas por una búsqueda
 * @author juanfvasquez
 * 20-Jul-2019
 */
class Buscar extends Component {

  state = {
    query: '',
    bicicletas: [],
    pagina: 0
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
    <ItemBicicleta bicicleta={item} abrirBicicleta={this.abrirBicicleta(item).bind(this)} />
  )

  /**
   * Método para evento cambio en el input
   */
  handleChange = query => {
    this.setState({ query })
  }

  /**
   * Método para buscar bicicletas
   */
  buscar = async () => {
    const { query, pagina } = this.state
    // const filtradas = bicicletas.filter(b => JSON.stringify(b).toLowerCase().includes(query.toLowerCase()))
    // this.setState({ bicicletas: filtradas })

    const response = await buscarBicicletas(query, LIMIT, pagina * LIMIT)
    if (response.status === 200) {
      const bicicletas = response.data.list
      this.setState({ bicicletas })
    }
  }

  render() {
    const { navigation } = this.props
    const { query, bicicletas } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.abrirBusqueda} onPress={() => navigation.goBack()}>
            <Icon name="md-arrow-back" size={27} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Buscar</Text>
          <View />
        </View>
        <View style={styles.barraBusqueda}>
          <TextInput value={query} onChangeText={this.handleChange} style={styles.input} placeholder="Buscar..." />
          <TouchableOpacity style={styles.botonBuscar} onPress={this.buscar}>
            <Icon name="md-search" size={27} color="#000" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.containerBicicletas} ref={ref => this.scrollView = ref}>
          <FlatList
            data={bicicletas}
            renderItem={this.renderBicicletas}
            keyExtractor={(item, index) => `${item.id}`}
            ItemSeparatorComponent={() => (<View style={styles.separador} />)}
          />
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
  },
  barraBusqueda: {
    marginTop: 60,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  input: {
    flex: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginRight: 5
  },
  botonBuscar: {
    flex: 1
  }
})

export default Buscar
