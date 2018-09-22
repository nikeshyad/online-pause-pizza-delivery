//Second Screen
//Asks the user if they want to order Cheesy Bread, Chicken Fingers, or Quesadilla

import React from 'react';
import { Alert, StyleSheet, Text, View,Picker,Dimensions } from 'react-native';

import { Container, Header, Content, Card, CardItem, Icon,Thumbnail,  Button,  Left, Body, Right,List,Footer,FooterTab,Segment,HeaderTab} from 'native-base';
const Home=require ('./Home');
var baseurl='http://162.210.90.60:8000/v5/';
const {width,height}=Dimensions.get('window');   //gets the screen size of the device


export default class Appetizers extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count:0,
      appetizersoptions:{} //
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Appetizers',
  });
  SetUpAppetizersScreen=(item)=>{
    this.setState({appetizersoptions:item.list})                    //contains the two options: Build your Own or Speciality
  }
  componentWillMount(){
    var appetizersurl='http://162.210.90.60:8000/v5/appetizers';
    var request= async(url)=>{
      const response=await fetch(url);
      const json=await response.json();
      {this.SetUpAppetizersScreen(json)};
    } 
    request(appetizersurl);
  }
  render(){
    OrderAppetizers=(itemname)=>{
      Home.checkoutInfo.currentItem = Home.checkoutInfo.currentItem.concat('/'+itemname.title.toLowerCase().replace(/\s/g, ''));
      const { navigate } = this.props.navigation;
      Home.userOrder['item']=itemname.title;
      console.log("THIS IS THE ORDER NOW",Home.userOrder);
      if (itemname.title == "Cheesy Bread") {
        navigate('Toppings');
      } else if (itemname.title == "Chicken Fingers") {
        navigate('Size');
      } else if (itemname.title == "Quesadilla"){
        navigate('Quesadilla');
      }
    }


    return(
      <Container>
      <Content>
      <List dataArray={this.state.appetizersoptions} renderRow={(item)=>
        <Card>
        <CardItem button onPress={() => OrderAppetizers(item)}>
        <Icon active name="ios-restaurant"/>
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