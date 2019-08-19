import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import {colors} from '../utils/colors'
import { format } from '../utils/format'

import ItemCarrito from './ItemCarrito'

class Carrito extends Component {

	/**
	 * Método para renderizar cada item del carrito
	 * @param item objeto a renderizar
	 * @returns Component que representa el item del carrito
	 */
	renderItemCarrito = ({ item }) => (
		<ItemCarrito item={item} />
	)

	/**
	 * Método para calcular el precio total de los items agregados en el carrito 
	 * @returns total precio total de los items agregados al carrito
	 */
	calcularTotalCarrito = () => {
		const { carrito } = this.props
		const keys = Object.keys(carrito)
		let total = 0
		keys.forEach(k => {
			total += carrito[k].cantidad * carrito[k].bicicleta.precio
		})
		return total
	}
	
	render() {
		const { navigation, carrito } = this.props
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon name="md-arrow-back" size={27} color="#fff" />
					</TouchableOpacity>
					<Text style={styles.titulo}>Mi Carrito</Text>
					<View />
				</View>
				<View style={styles.itemsCarrito}>
					<FlatList 
						keyExtractor={(item, index) => `${index}`} 
						data={Object.keys(carrito).map(k => carrito[k])} 
						renderItem={this.renderItemCarrito} 
					/>
				</View>
				<View style={styles.infoTotal}>
					<Text style={styles.labelTotal}>Total: </Text>
					<Text style={styles.total}>$ { format(this.calcularTotalCarrito()) }</Text>
				</View>
			</View>
		);
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
	itemsCarrito: {
		marginTop: 60
	},
	infoTotal: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 25,
		marginTop: 30
	},
	total: {
		fontWeight: 'bold',
		color: '#a22',
		fontSize: 18
	},
	labelTotal: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 18
	}
})
				
const mapStateToProps = ({ carrito }) => ({
	carrito: carrito.carrito
})

export default connect(mapStateToProps)(Carrito)