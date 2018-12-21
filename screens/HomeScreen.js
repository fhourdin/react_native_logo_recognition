import React from 'react'
import { RkButton, RkText } from 'react-native-ui-kitten'
import { View, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const fetch = new Promise((resolve, reject) => {
  return setTimeout(function() {
    resolve({ foo: 'bar' })
  }, 2000)
})

class HomeScreen extends React.Component {
  state = {
    uploading: false,
  }

  static navigationOptions = {
    title: 'Reconnaissance de logo',
  }

  handleImage = () => {
    const { navigate } = this.props.navigation
    this.setState({ uploading: true })
    fetch.then((res) => {
      this.setState({ uploading: false })
      navigate('Results', res)
    })
  }

  render() {
    const { uploading } = this.state

    return (
      <View style={styles.container}>
        <RkButton
          rkType="large"
          title="upload image"
          onPress={() => this.handleImage()}
        >
          <Image source={require('../assets/search_image.png')} />
        </RkButton>
        <RkText rkType="subtitle">Prendre une photo</RkText>
      </View>
    )
  }
}

export default HomeScreen
