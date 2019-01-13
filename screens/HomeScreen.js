import React from 'react'
import { RkButton, RkText } from 'react-native-ui-kitten'
import { View, StyleSheet, Image } from 'react-native'
import { ImagePicker } from 'expo'
import 'whatwg-fetch'
import Loader from '../components/Loader'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

    if (!result.cancelled) {
      this.handleImage(result)
    }
  }

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    })

    if (!result.cancelled) {
      this.handleImage(result)
    }
  }

  handleImage = (result) => {
    const { navigate } = this.props.navigation

    this.setState({ uploading: true })
    delay(1000).then((res) => {
      const { cancelled } = this.state

      if (cancelled) {
        this.setState({ cancelled: false, uploading: false })
      } else {
        return fetch(
          'https://fr.wikipedia.org/w/api.php?action=query&format=json&exintro&exsentences=10&explaintext&prop=extracts|images|description&pageids=' +
            '3098036'
        )
          .then((response) => {
            return response.json()
          })
          .then((json) => {
            console.log("DONE")
            this.setState({ uploading: false })
            navigate('Results', {
              score: 0.678,
              wiki_id: '3098036',
              uri: result.uri,
              item: json.query.pages[Object.keys(json.query.pages)[0]],
            })
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
            style={{ marginTop: 30 }}
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
        <RkButton
          rkType="xlarge"
          title="upload image"
          onPress={this._pickImage}
        >
          Utiliser une image existante
        </RkButton>
        <RkButton
          style={{ marginTop: 20 }}
          rkType="xlarge"
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
