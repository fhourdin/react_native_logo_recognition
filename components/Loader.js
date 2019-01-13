import React from 'react'
import { RkText } from 'react-native-ui-kitten'
import { View, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
	container: {
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
			<Image
				style={styles.loader}
				source={require('../assets/loader2.gif')}
			/>
			<RkText rkType="subtitle">Recherche en cours</RkText>
			{props.children}
		</View>
	)
}

export default Loader
