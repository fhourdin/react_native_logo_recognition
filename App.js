import { createStackNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import GreetingScreen from "./screens/GreetingScreen";

const App = createStackNavigator({
	Home: { screen: HomeScreen },
	Results: { screen: ResultsScreen },
	Greetings: { screen: GreetingScreen }
});
export default createAppContainer(App);
