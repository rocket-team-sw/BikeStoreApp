import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { format } from '../utils/format'

class ItemCarrito extends Component {
	render() {
		const { bicicleta, cantidad } = this.props.item
		return (
			<View style={styles.container}>
				<View style={styles.infoBorrar}>
					<TouchableOpacity style={styles.btnBorrar}>
						<Icon name="md-trash" size={18} color="#a22" />
					</TouchableOpacity>
				</View>
				<View style={styles.infoBicicleta}>
					<Image style={styles.imagen} resizeMode="cover" source={{ uri: bicicleta.imagen }}/>
					<View style={styles.detallesBicicleta}>
						<Text style={styles.referecia}>{ bicicleta.referencia }</Text>
						<Text style={styles.nombre}>{ bicicleta.nombre }</Text>
					</View>
				</View>
				<View style={styles.infoCantidad}>
					<Text style={styles.cantidad}>{ cantidad }</Text>
				</View>
				<View style={styles.infoTotal}>
					<Text style={styles.total}>{ format(cantidad * bicicleta.precio) }</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10
	},
	infoBorrar: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnBorrar: {
		padding: 7,
	},
	infoBicicleta: {
		flex: 2.5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	total: {
		color: '#a22',
		fontWeight: 'bold'
	},
	imagen: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 12
	},
	infoCantidad: {
		flex: 0.4
	},
	infoTotal: {
		flex: 1
	}
})

export default ItemCarrito