import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './screens/Home';
import Kitchen from './screens/Kitchen';
import LateMenu from './screens/LateMenu';
import Toppings from './screens/Toppings';
import Pizza from './screens/Pizza';
import Quesadilla from './screens/Quesadilla';
import Desserts from './screens/Desserts';
import Drinks from './screens/Drinks';
import Appetizers from './screens/Appetizers';
import Sides from './screens/Sides';
import Checkout from './screens/Checkout';
import Size from './screens/Size';
import SpecialtyPizza from './screens/SpecialtyPizza';



const Navi=StackNavigator({
  Home:{screen:Home},
  Kitchen:{screen: Kitchen},
  LateMenu:{screen:LateMenu},
  Toppings:{screen:Toppings},
  Pizza:{screen:Pizza},
  Quesadilla:{screen:Quesadilla},
  Desserts:{screen:Desserts},
  Drinks:{screen:Drinks},
  Appetizers:{screen:Appetizers},
  Sides:{screen:Sides},
  Checkout:{screen:Checkout},
  Size:{screen:Size},
  SpecialtyPizza:{screen:SpecialtyPizza},



});

export default class Main extends React.Component {
  render() {
    return <Navi/>;
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
