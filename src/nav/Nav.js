import { createStackNavigator } from 'react-navigation'

import Buscar from '../components/Buscar'
import Bicicletas from '../components/Bicicletas'

const stackNav = createStackNavigator({
  Bicicletas, Buscar
}, {
  initialRouteName: 'Bicicletas',
  navigationOptions: {
    header: null
  }
})

export default stackNav