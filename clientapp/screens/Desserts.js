//Second Screen
//Asks the user if they want to order Milkshake or Icecream

import React from 'react';
import { Alert, StyleSheet, Text, View,Picker,Dimensions } from 'react-native';

import { Container, Header, Content, Card, CardItem, Icon,Thumbnail,  Button,  Left, Body, Right,List,Footer,FooterTab,Segment,HeaderTab} from 'native-base';
const Home=require ('./Home');
var baseurl='http://162.210.90.60:8000/v5/';
const {width,height}=Dimensions.get('window');   //gets the screen size of the device


export default class Desserts extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count:0,
      dessertsoptions:{} //
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Desserts',
  });
  SetUpDessertsScreen=(item)=>{
    this.setState({dessertsoptions:item.list})                    //contains the two options: Build your Own or Speciality
  }
  componentWillMount(){
    var dessertsurl='http://162.210.90.60:8000/v5/desserts';
    var request= async(url)=>{
      const response=await fetch(url);
      const json=await response.json();
      {this.SetUpDessertsScreen(json)};
    } 
    request(dessertsurl);
  }
  render(){
    OrderDesserts=(itemname)=>{
      Home.checkoutInfo.currentItem = Home.checkoutInfo.currentItem.concat('/'+itemname.title.toLowerCase().replace(/\s/g, ''));
      console.log(Home.checkoutInfo.currentItem);
      const { navigate } = this.props.navigation;
      Home.userOrder['item']=itemname.title;
      console.log("THIS IS THE ORDER NOW",Home.userOrder);
      navigate('Size');
    }


    return(
      <Container>
      <Content>
      <List dataArray={this.state.dessertsoptions} renderRow={(item)=>
        <Card>
        <CardItem button onPress={() => OrderDesserts(item)}>
        <Icon active name="ios-ice-cream"/>
        <Text> {item.title}</Text>
        <Right>
        <Icon name="arrow-forward" />
        </Right>
        </CardItem>

        </Card>
      }>
      </List>
      </Content>
      </Container>

      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});