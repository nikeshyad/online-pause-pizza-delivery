import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Button} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { FormLabel, FormInput } from 'react-native-elements';
const Home=require ('./Home'); 

export default class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      customerMsg: '',
      customerName: '',
      customerPhone: '',
      customerDorm: '',
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Checkout'
  });

  setCustomerName = (index) => {
    this.setState({customerName: index});
    Home.checkoutInfo.name=index;

  }

  setCustomerPhone = (index) => {
    this.setState({customerPhone: index})
    console.log(index);
    Home.checkoutInfo.phone=index;
  }

  setCustomerDorm = (index) => {
    this.setState({customerDorm: index})
    //console.log(index);
    Home.checkoutInfo.dorm=index;
  }

  addCustomerMsg = () => {
    console.log(Home.checkoutInfo);
    this.setState({...this.state, customerMsg: "Thank you " + this.state.customerName + " \n for placing your order!"})

    fetch('http://162.210.90.60:8000/v5/checkout', {
      method:'POST',
      body:JSON.stringify(Home.checkoutInfo),
      headers: {'Content-Type':'application/json'}
    })
    .then((res)=>
      res.json())
    .then((data)=>{
      console.log('Posting check out info')
    });
    Home.componentWillMount();  }

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    const {navigate} = this.props.navigation

    return (
      <View style={styles.container}>



    <FormLabel>Name</FormLabel>
    <FormInput onChangeText = {this.setCustomerName}/>

    <FormLabel>Phone Number</FormLabel>
    <FormInput onChangeText = {this.setCustomerPhone}/>

    <FormLabel>Dorm</FormLabel>
    <FormInput onChangeText = {this.setCustomerDorm}/>

    <Button
    backgroundColor='#5499C7'
    raised
    large
    onPress={this.addCustomerMsg}
    title= "Place Your Order" 
    />

    <Text style={styles.textStyle}>{this.state.customerMsg} </Text>

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
    color: '#808B96',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },

  buttonContainer: {
    margin: 10
  },
});