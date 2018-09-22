//Second Screen
//Asks the user if they want to build a pizza or want to order a speciality Pizza

import React from 'react';
import { Alert, StyleSheet, Text, View,Picker,Dimensions } from 'react-native';

import { Container, Header, Content, Card, CardItem, Icon,Thumbnail,  Button,  Left, Body, Right,List,Footer,FooterTab,Segment,HeaderTab} from 'native-base';
const Home=require ('./Home');
var baseurl='http://162.210.90.60:8000/v5/';
const {width,height}=Dimensions.get('window');   //gets the screen size of the device


export default class Pizza extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count:0,
      pizzaoptions:{} //
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Pizza',
  });
  SetUpPizzaScreen=(item)=>{
    this.setState({pizzaoptions:item.list})                    //contains the two options: Build your Own or Speciality
  }
  componentWillMount(){
    var pizzaurl='http://162.210.90.60:8000/v5/pizza';
    var request= async(url)=>{
      const response=await fetch(url);
      const json=await response.json();
      {this.SetUpPizzaScreen(json)};
    } 
    request(pizzaurl);
  }
  render(){
    OrderPizza=(itemname)=>{
      Home.checkoutInfo.currentItem = Home.checkoutInfo.currentItem.concat('/'+itemname.title.toLowerCase().substr(0,itemname.title.indexOf(' ')));
      const { navigate } = this.props.navigation;
      Home.userOrder['item']=itemname.title;
      console.log("THIS IS THE ORDER NOW",Home.userOrder);
      if (itemname.title == "Build Your Own Pizza") {
        navigate('Size');
      } else if (itemname.title == "Specialty Pizza") {
        navigate('SpecialtyPizza');
      }
    }


    return(
      <Container>
      <Content>
      <List dataArray={this.state.pizzaoptions} renderRow={(item)=>
        <Card>
        <CardItem button onPress={() => OrderPizza(item)}>
        <Icon active name="ios-pizza"/>
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