//Screen to let user select few options after logging in

import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Button} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'
import { FormLabel, FormInput } from 'react-native-elements';

export default class ManagerScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
  }
};
  static navigationOptions = ({ navigation }) => ({
    title: 'Log In Success',
  });

  render() {
    const { params } = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    return (

  <View style={styles.container}>
   <View style={styles.buttonContainer}>
      <Button
        backgroundColor = '#5499C7'
        raised
        large
        onPress = {() => navigate('Hours')}
        title = "Set Open/Close Time"
        />
        </View>

  <View style={styles.buttonContainer}>
	<Button
          backgroundColor='#5499C7'
          raised
          large
          onPress={() => navigate('Order')}
          title= "All Orders  "
        />
      </View>

    <View style={styles.buttonContainer}>
    <Button
          backgroundColor='#5499C7'
          raised
          large
          onPress={() => navigate('Ingredients')}
          title= "Ingredients"
        />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  textStyle: {
    color: '#EC7063',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },

  buttonContainer: {
    margin: 10
  },
});
