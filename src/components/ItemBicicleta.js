import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

/**
 * Clase para presentar información preliminar sobre una bicicleta
 * @author juanfvasquez
 * 5-Jul-2019
 */
class ItemBicicleta extends Component {
  render() {
    const { bicicleta } = this.props
    return (
      <TouchableOpacity style={styles.itemBicicleta}>
        <View style={styles.info}>
          <Text style={styles.referencia}>{bicicleta.referencia}</Text>
          <Text style={styles.nombre}>{bicicleta.nombre}</Text>
          <Text style={styles.precio}>{bicicleta.precio}</Text>
        </View>
        <View style={styles.viewImagen}>
          <Image source={{ uri: bicicleta.imagen }} style={styles.imagen} resizeMode="cover" />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemBicicleta: {
    flexDirection: 'row',
  },
  info: {
    flex: 3,
    flexDirection: 'column',
    padding: 20
  },
  viewImagen: {
    flex: 2,
  },
  imagen: {
    flex: 1,
    flexGrow: 1
  },
  separador: {
    height: 10,
    backgroundColor: '#ddd',
    width: '100%'
  },
  referencia: {
    fontSize: 12,
    color: '#555',
  },
  nombre: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold'
  },
  precio: {
    fontSize: 13,
    color: '#a22',
    fontWeight: '500'
  }
})

export default ItemBicicleta