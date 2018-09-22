//Second Screen
//Asks the user if they want to order a Cheese Quesadilla, Chicken Quesadilla, or an Ultimate Chicken Quesadilla

import React from 'react';
import { Alert, StyleSheet, Text, View,Picker,Dimensions } from 'react-native';

import { Container, Header, Content, Card, CardItem, Icon,Thumbnail,  Button,  Left, Body, Right,List,Footer,FooterTab,Segment,HeaderTab} from 'native-base';
const Home=require ('./Home');
var baseurl='http://162.210.90.60:8000/v5/';
const {width,height}=Dimensions.get('window');   //gets the screen size of the device


export default class Quesadilla extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count:0,
      quesadillaoptions:{} //
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Quesadilla',
  });
  SetUpQuesadillaScreen=(item)=>{
    this.setState({quesadillaoptions:item.list})                    //contains the two options: Build your Own or Speciality
  }
  componentWillMount(){
    var quesadillaurl='http://162.210.90.60:8000/v5/appetizers/quesadilla';
    var request= async(url)=>{
      const response=await fetch(url);
      const json=await response.json();
      {this.SetUpQuesadillaScreen(json)};
    } 
    request(quesadillaurl);
  }
  render(){
    OrderQuesadilla=(itemname)=>{
      Home.checkoutInfo.currentItem = Home.checkoutInfo.currentItem;
      console.log(Home.checkoutInfo.currentItem);
      const { navigate } = this.props.navigation;
      Home.userOrder['item']=itemname.title;
      console.log("THIS IS THE ORDER NOW",Home.userOrder);
      navigate('Size');
    }


    return(
      <Container>
      <Content>
      <List dataArray={this.state.quesadillaoptions} renderRow={(item)=>
        <Card>
        <CardItem button onPress={() => OrderQuesadilla(item)}>
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