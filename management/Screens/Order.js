//Screen that displaces list of orders that have been received

import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Button} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'
import { SwipeRow, Image, Left, Header, CardItem, DeckSwiper, Card, Container, Content,ListItem,List,Body,Thumbnail,Right,Footer,FooterTab,Icon } from 'native-base';

var Home = require('./Home');
var orderResponse;
const {width,height}=Dimensions.get('window');

export default class Order extends React.Component {
  constructor(props){
    super(props);
    this.state={
      orders:{},
      }
    }

  static navigationOptions = {
    title: 'Orders',
  };

  SetUpOrderScreen = (data) => {
    this.setState({orders:data.Orders});
    //console.log(this.state.orders)
  }

  //runs as soon as the screen is rendered, stores the response JSON object into orderResponse
  componentWillMount() {
    //Home.logIn('http://162.210.90.60:7000/v5/login', 'yadav1','abcd');
		var request = async(url)=>{
			const response = await fetch(url);
			const json = await response.json();
      orderResponse = json;
			{this.SetUpOrderScreen(json)};
		}
    console.log(Home.Orders)
		request(Home.Orders);
	}


  //function that sends a POST request to the server with unique ID of the order so that we can
  //acknowledge order has been complete and that order is then removed from the list of orders
  orderComplete = (itemID) => {
    console.log(Home.ordercomplete+ "/" + itemID)
    fetch(Home.ordercomplete + "/" + itemID, {
      method:'POST',
      body:JSON.stringify(null),
      headers: {'Content-Type':'application/json'}
    })
    .then((res)=>
      res.json())
    .then((data)=>{
    });
    alert('Order Received')
    this.componentWillMount()
  }

  render() {
    const { navigate } = this.props.navigation;
    return(
      <Container>
      <Content>
      <ScrollView style={{height:height/1.3}}>
      <List dataArray={this.state.orders} renderRow={(item)=>
        <ListItem>
        <Thumbnail square size={80} source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}} />
        <View style={styles.buttonContainer}>
        <Button
              backgroundColor='#5499C7'
              raised
              small
              onPress={() => this.orderComplete(item.OrderID)}
              title= {item.name}
            />
        </View>
        <Body>
        <Right>
        <Text>{'Phone: ' + item.phone}</Text>
        <Text note>{'Dorm: '+ item.dorm}</Text>
        <Text note>{'Total Price: $' + item.price}</Text>

        <List dataArray = {item.itemsOrdered} renderRow = {(itemO) =>
          <ListItem>
          <Text>{itemO.increment + " " + itemO.category + ":"} </Text>
            <List dataArray = {itemO.extraIncrement} renderRow = {(extra) =>
            //<ListItem>
              <Text>{extra}</Text>
            //</ListItem>
            }>
          </List>
          </ListItem>
        }>
        </List>

        </Right>
        </Body>
        </ListItem>
      }>
      </List></ScrollView>
      </Content>
      </Container>
      );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#EC7063',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
  	margin:10
  },
});
