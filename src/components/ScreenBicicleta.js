import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../utils/colors'
import { format } from '../utils/format'
import InputSpinner from 'react-native-input-spinner'
import {setCarrito} from '../actions/carrito'
import {guardarCarrito} from '../services/localStorage'

class ScreenBicicleta extends Component {
	
	state = {
		cantidad: 1
	}

	/**
	 * Evento del cambio de valor del spinner de cantidad
	 * @param cantidad nuevo valor del spinner
	 */
	cambioSpinner = cantidad => this.setState({ cantidad })

	/**
	 * Método para agregar la bicicleta al carrito con la cantidad seleccionada
	 */
	agregarACarrito = () => {
		const { navigation, carrito, dispatch } = this.props
		const { bicicleta } = navigation.state.params
		const { cantidad } = this.state
		
		const item = carrito[bicicleta.id]
		if (!item) {
			carrito[bicicleta.id] = {bicicleta, cantidad}
		} else {
			item.cantidad += cantidad
			carrito[bicicleta.id] = item
		}
		dispatch(setCarrito(carrito))
		guardarCarrito(carrito)
		alert("Se ha agregado al carrito!")
	}
	
	render() {
		const { navigation } = this.props
		const { bicicleta } = navigation.state.params
		const { cantidad } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon name="md-arrow-back" size={27} color="#fff" />
					</TouchableOpacity>
					<Text style={styles.titulo}>{ bicicleta.nombre }</Text>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon name="md-cart" size={27} color="#fff" />
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.containerBicicleta}>
					<Image source={{ uri: bicicleta.imagen }} style={styles.imagen} resizeMode="cover" />
					<View style={styles.infoContainer}>
						<View style={styles.rowInfo}>
							<Text style={styles.subtitulo}>Referencia: </Text>
							<Text style={styles.valor}>{ bicicleta.referencia }</Text>
						</View>
						<View style={styles.rowInfo}>
							<Text style={styles.subtitulo}>Nombre: </Text>
							<Text style={styles.valor}>{ bicicleta.nombre }</Text>
						</View>
						<View style={styles.rowInfo}>
							<Text style={styles.subtitulo}>Descripción: </Text>
							<Text style={styles.valor}>{ bicicleta.descripcion }</Text>
						</View>
						<View style={styles.rowInfo}>
							<Text style={styles.subtitulo}>Precio: </Text>
							<Text style={[styles.valor, styles.precio]}>{ format(bicicleta.precio) }</Text>
						</View>
					</View>
					<View>
						<Text style={styles.tituloCarrito}>¿Agregar a Carrito?</Text>
					</View>
					<View style={styles.infoCarrito}>
						<InputSpinner
							max={10}
							min={1}
							colorMax={colors.main}
							colorMin={colors.secondary}
							value={cantidad}
							onChange={this.cambioSpinner.bind(this)}
							fontSize={17}
						/>
						<TouchableOpacity style={styles.botonCarrito} onPress={this.agregarACarrito}>
							<Icon name="md-add" color="#fff" size={27} />
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
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
	containerBicicleta: {
		marginTop: 60,
	},
	infoContainer: {
		padding: 20,
		flexDirection: 'column'
	},
	imagen: {
		width: '100%',
		height: 200
	},
	rowInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	subtitulo: {
		fontSize: 15,
		fontWeight: '700',
		marginRight: 20,
		color: '#777'
	},
	valor: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#000'
	},
	precio: {
		color: '#a22'
	},
	infoCarrito: {
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	tituloCarrito: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000',
		marginLeft: 20
	},
	botonCarrito: {
		paddingHorizontal: 25,
		paddingVertical: 12,
		backgroundColor: colors.main,
		borderRadius: 5
	}
})

const mapStateToProps = ({ carrito }) => ({
	carrito: carrito.carrito
})

export default connect(mapStateToProps)(ScreenBicicleta)