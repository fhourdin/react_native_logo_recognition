import React from "react";
import { View, StyleSheet } from "react-native";
import { RkText } from "react-native-ui-kitten";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2D142C",
		alignItems: "center",
		justifyContent: "center"
	}
});

class GreetingScreen extends React.Component {
	componentDidMount() {
		const { navigation } = this.props;

		setTimeout(() => navigation.popToTop(), 2000);
	}

	render() {
		return (
			<View style={styles.container}>
				<RkText
					rkType="xxlarge"
					style={{
						color: "white",
						textAlign: "center",
						padding: 20,
						marginBottom: 20
					}}
				>
					Merci de votre participation !
				</RkText>
			</View>
		);
	}
}

export default GreetingScreen;
