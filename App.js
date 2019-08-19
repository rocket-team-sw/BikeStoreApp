import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/reducers'
import Nav from './src/nav/Nav'
import {cargarCarrito} from './src/services/localStorage';
import {setCarrito} from './src/actions/carrito';

const store = createStore(reducers)

class App extends Component {
	
	componentWillMount() {
		this.cargarItemsCarrito()
	}

	cargarItemsCarrito = async () => {
		let carrito = await cargarCarrito()
		if (!carrito || typeof carrito !== 'object') {
			carrito = {}
		}
		store.dispatch(setCarrito(carrito))
	}
	
	render() {
		return (
			<Provider store={store}>
				<Nav />
			</Provider>
		);
	}
}

export default App