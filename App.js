import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/reducers'
import Nav from './src/nav/Nav'

const store = createStore(reducers)

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Nav />
			</Provider>
		);
	}
}

export default App