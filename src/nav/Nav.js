import { createStackNavigator } from 'react-navigation'

import Buscar from '../components/Buscar'
import Bicicletas from '../components/Bicicletas'
import Bicicleta from '../components/ScreenBicicleta'

const stackNav = createStackNavigator({
  Bicicletas, Buscar, Bicicleta
}, {
  initialRouteName: 'Bicicletas',
  navigationOptions: {
    header: null
  }
})

export default stackNav