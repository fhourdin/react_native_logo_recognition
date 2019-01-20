import React from 'react'
import { RkCard, RkText } from 'react-native-ui-kitten'
import { StyleSheet, Text, Image, View, FlatList } from 'react-native'

class ResultsScreen extends React.Component {
  state = { item: null }

  static navigationOptions = {
    title: 'Résultats',
    headerStyle: {
      backgroundColor: '#C72C41',
    },
    headerTintColor: '#fff',
  }

  renderItem = ({ item }) => {
    return (
      <RkCard style={styles.card}>
        <View rkCardHeader>
          <RkText rkType="header" style={{ color: 'white' }}>
            Score : {(item.score * 100).toFixed(2)}%
          </RkText>
        </View>
        <Image
          rkCardImg
          source={{
            uri: item.image_url,
          }}
        />
      </RkCard>
    )
  }

  render() {
    const {
      navigation: {
        state: {
          params: { results },
        },
      },
    } = this.props

    if (!results || results.length === 0) {
      return (
        <View style={styles.container}>
          <RkCard>
            <RkText rkType="header">Aucun résultat...</RkText>
          </RkCard>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={results}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D142C',
  },
  card: {
    marginTop: 10,
    backgroundColor: '#801336',
  },
})

export default ResultsScreen
