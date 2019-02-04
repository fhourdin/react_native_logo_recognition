import React from "react";
import { RkCard, RkButton } from "react-native-ui-kitten";
import { StyleSheet, Text, Image, View, FlatList } from "react-native";
import CheckIcon from "../assets/check.png";

class Footer extends React.Component {
	state = {
		done: false,
		hide: false
	};

	onPress = () => {
		const { setSelected, navigation } = this.props;
		return navigation.push("Greetings");
	};

	render() {
		const { count, setSelected } = this.props;
		const { hide, done } = this.state;
		if (count === 0 || hide) {
			return null;
		}
		return (
			<View style={done ? styles.doneContainer : styles.container}>
				<Text style={styles.text}>
					{!done
						? count + " image(s) sélectionnée(s)"
						: "Merci de votre participation"}
				</Text>
				{!done && (
					<RkButton
						style={styles.button}
						onPress={() => this.onPress()}
					>
						<Image source={CheckIcon} />
					</RkButton>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		paddingRight: 0,
		position: "absolute",
		bottom: 0,
		width: "100%",
		backgroundColor: "#EE4540"
	},
	doneContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		paddingRight: 0,
		position: "absolute",
		bottom: 0,
		width: "100%",
		backgroundColor: "#2ecc71"
	},
	button: {
		backgroundColor: "#EE4540"
	},
	text: {
		flex: 1,
		color: "white"
	}
});

export default Footer;
