import React from 'react'
import { RkButton, RkText } from 'react-native-ui-kitten'
import { View, StyleSheet, Image } from 'react-native'
import { ImagePicker, ImageManipulator } from 'expo'
import 'whatwg-fetch'
import Loader from '../components/Loader'

//const SERVER_URL = '83.152.106.82:8585'
const SERVER_URL = '192.168.43.17:8000'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D142C',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function delay(t, v) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, v), t)
  })
}

class HomeScreen extends React.Component {
  state = {
    uploading: false,
  }

  static navigationOptions = {
    title: 'Reconnaissance de logo',
    headerStyle: {
      backgroundColor: '#C72C41',
    },
    headerTintColor: '#fff',
  }

  componentDidMount() {
    this.getPermissions()
  }

  getPermissions = async () => {
    const { Location, Permissions } = Expo
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    )
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    })

    if (result.cancelled) {
      return
    }

    this._resize(result).then((res) => {
      this.handleImage(res)
    })
  }

  _resize = async (result) => {
    const optimizedResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 300 } }],
      { base64: true }
    )

    if (optimizedResult.cancelled) {
      return
    }

    return optimizedResult
  }

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    })

    if (result.cancelled) {
      return
    }
    this._resize(result).then((res) => {
      this.handleImage(res)
    })
  }

  handleImage = (result) => {
    const { navigate } = this.props.navigation

    this.setState({ uploading: true })

    fetch('http://'+ SERVER_URL +'/img_searches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64: 'data:image/jpeg;base64,' + result.base64,
      }),
    })
      .then((res1) => {
        return res1.json()
      })
      .then((json1) => {
        const { cancelled } = this.state
        if (cancelled) {
          this.setState({ cancelled: false, uploading: false })
        } else {
          fetch('http://' + SERVER_URL + json1.Location, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res2) => {
              return res2.json()
            })
            .then((json2) => {
              const { cancelled } = this.state

              if (cancelled) {
                this.setState({ cancelled: false, uploading: false })
              } else {
              }

              this.setState({ uploading: false })
              return navigate('Results', json2)
            })
        }
      })
  }

  render() {
    const { uploading } = this.state
    if (uploading) {
      return (
        <Loader>
          <RkButton
            rkType="large"
            style={{ marginTop: 3, backgroundColor: '#EE4540' }}
            title="Annuler"
            onPress={() => this.setState({ cancelled: true })}
          >
            Annuler
          </RkButton>
        </Loader>
      )
    }
    return (
      <View style={styles.container}>
        <RkText
          rkType="xxlarge"
          style={{
            color: 'white',
            textAlign: 'center',
            padding: 20,
            marginBottom: 20,
          }}
        >
          Pour commencer, choisissez une image
        </RkText>
        <RkButton
          style={{ backgroundColor: '#EE4540' }}
          rkType="large"
          title="upload image"
          onPress={this._pickImage}
        >
          Utiliser une image existante
        </RkButton>
        <RkButton
          style={{ marginTop: 20, backgroundColor: '#EE4540' }}
          rkType="large"
          title="upload image"
          onPress={this._takePhoto}
        >
          Prendre une photo
        </RkButton>
      </View>
    )
  }
}

export default HomeScreen
