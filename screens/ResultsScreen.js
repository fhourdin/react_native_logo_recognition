import React from "react";
import { RkCard, RkText, RkButton } from "react-native-ui-kitten";
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";
import Footer from "../components/Footer";
import _ from "lodash";

const FAKE_DATA = [
  {
    image_url: "http://www.noelshack.com/2019-05-4-1548941187-13.jpg",
    score: "0.126"
  },
  {
    image_url: "http://www.noelshack.com/2019-05-4-1548941187-13.jpg",
    score: "0.126"
  },
  {
    image_url: "http://www.noelshack.com/2019-05-4-1548941187-13.jpg",
    score: "0.126"
  },
  {
    image_url: "http://www.noelshack.com/2019-05-4-1548941187-13.jpg",
    score: "0.126"
  },
  {
    image_url: "http://www.noelshack.com/2019-05-4-1548941187-13.jpg",
    score: "0.126"
  }
];

class ResultsScreen extends React.Component {
  state = { item: null, selected: [] };

  static navigationOptions = {
    title: "Résultats",
    headerStyle: {
      backgroundColor: "#C72C41"
    },
    headerTintColor: "#fff"
  };

  handlePress = index => {
    const { selected } = this.state;
    let new_selected = [...selected];

    if (selected.includes(index)) {
      _.pull(new_selected, index);
    } else {
      new_selected.push(index);
    }
    this.setState({
      selected: new_selected
    });
  };

  setSelected = value => {
    this.setState({ selected: value });
  };

  renderItem = data => {
    const { item, index } = data;
    const { selected } = this.state;

    const splitted = item.image_url.split("-");
    const img_url =
      "http://image.noelshack.com/fichiers/" +
      splitted[0].substring(splitted[0].length - 4, splitted[0].length) +
      "/" +
      splitted[1] +
      "/" +
      splitted[2] +
      "/" +
      splitted[3] +
      "-" +
      splitted[4];

    return (
      <TouchableHighlight onPress={() => this.handlePress(index)}>
        <RkCard
          style={selected.includes(index) ? styles.selectedCard : styles.card}
        >
          <View rkCardHeader>
            <RkText rkType="header" style={{ color: "white" }}>
              Score : {(item.score * 100).toFixed(2)}%
            </RkText>
          </View>
          <Image
            rkCardImg
            source={{
              uri: img_url
            }}
          />
        </RkCard>
      </TouchableHighlight>
    );
  };

  render() {
    const { navigation } = this.props;
    const { selected } = this.state;
    //const results = FAKE_DATA;
    const results = navigation.state.params.results;

    if (!results || results.length === 0) {
      return (
        <View style={styles.container}>
          <RkCard style={styles.card}>
            <RkText rkType="header">Aucun résultat...</RkText>
          </RkCard>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={results}
          renderItem={this.renderItem}
          extraData={selected}
          keyExtractor={(item, index) => index.toString()}
        />
        <Footer
          count={selected.length}
          setSelected={this.setSelected}
          navigation={navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2D142C"
  },
  card: {
    marginTop: 10,
    backgroundColor: "#801336"
  },
  selectedCard: {
    marginTop: 10,
    opacity: 0.5
  }
});

export default ResultsScreen;
