import { createStackNavigator } from 'react-navigation'
import { createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen'
import ResultsScreen from './screens/ResultsScreen'

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Results: { screen: ResultsScreen },
})

export default createAppContainer(App)
