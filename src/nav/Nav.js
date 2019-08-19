import { createStackNavigator } from 'react-navigation'

import Buscar from '../components/Buscar'
import Bicicletas from '../components/Bicicletas'
import Bicicleta from '../components/ScreenBicicleta'
import Carrito from '../components/Carrito'

const stackNav = createStackNavigator({
  Bicicletas, Buscar, Bicicleta, Carrito
}, {
  initialRouteName: 'Bicicletas',
  navigationOptions: {
    header: null
  }
})

export default stackNav