import React from 'react'
import { RkText } from 'react-native-ui-kitten'
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#2D142C',
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loader: {
		height: 200,
		width: 200,
	},
})

const Loader = (props) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={200} color="white" />
			<RkText
				style={{ color: 'white', marginBottom: 40 }}
				rkType="subtitle"
			>
				Recherche en cours
			</RkText>
			{props.children}
		</View>
	)
}

export default Loader
