import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ResultsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.navigation.state.params)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ResultsScreen