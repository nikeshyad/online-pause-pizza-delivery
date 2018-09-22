//Second Screen
//Asks the user if they want to order a bottled drink or a fountain drink

import React from 'react';
import { Alert, StyleSheet, Text, View,Picker,Dimensions } from 'react-native';

import { Container, Header, Content, Card, CardItem, Icon,Thumbnail,  Button,  Left, Body, Right,List,Footer,FooterTab,Segment,HeaderTab} from 'native-base';
const Home=require ('./Home');
var baseurl='http://162.210.90.60:8000/v5/';
const {width,height}=Dimensions.get('window');   //gets the screen size of the device


export default class Drinks extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count:0,
      drinksoptions:{} //
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Drinks',
  });
  SetUpDrinksScreen=(item)=>{
    this.setState({drinksoptions:item.list})                    //contains the two options: Build your Own or Speciality
  }
  componentWillMount(){
    var drinksurl='http://162.210.90.60:8000/v5/drinks';
    var request= async(url)=>{
      const response=await fetch(url);
      const json=await response.json();
      {this.SetUpDrinksScreen(json)};
    } 
    request(drinksurl);
  }
  render(){
    OrderDrinks=(itemname)=>{
      Home.checkoutInfo.currentItem = Home.checkoutInfo.currentItem.concat('/'+itemname.title.toLowerCase().substr(0,itemname.title.indexOf(' ')));
      console.log(Home.checkoutInfo.currentItem);
      const { navigate } = this.props.navigation;
      Home.userOrder['item']=itemname.title;
      console.log("THIS IS THE ORDER NOW",Home.userOrder);
      navigate('Size');
    }


    return(
      <Container>
      <Content>
      <List dataArray={this.state.drinksoptions} renderRow={(item)=>
        <Card>
        <CardItem button onPress={() => OrderDrinks(item)}>
        <Icon active name="ios-pint"/>
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