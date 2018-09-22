import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Order from './Screens/Order';
import Home from './Screens/Home';
import Ingredients from './Screens/Ingredients';
import ManagerScreen from './Screens/ManagerScreen.js';
import Hours from './Screens/Hours.js';

export const ManagementApp = StackNavigator({
  Home: {screen: Home},
  Order: { screen: Order },
  Ingredients: {screen: Ingredients},
  ManagerScreen: {screen: ManagerScreen},
  Hours: {screen: Hours},
});

export default class App extends React.Component {
  render() {
    return <ManagementApp />;
  }
}
