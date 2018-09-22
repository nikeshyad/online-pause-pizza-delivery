//Pizza Delivery Aapp
//Team Members: Andrew, Deepak, Mazen, Nikesh, Kshitiz and Rustam
//Homescreen of the App - Home.js 

import React from 'react';
import { Alert, StyleSheet, Text, View,ScrollView,Image,Dimensions } from 'react-native';
import {StackNavigator} from 'react-navigation';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left,Body, Badge,Right,List,Footer,FooterTab,Segment,HeaderTab,Tabs,Tab} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
//import {Button} from 'react-native-elements';
const {width,height}=Dimensions.get('window');//gets the width and height of the window
var checkoutInfo={        //contains the customer inout food preferences and sends the request to the API
  name:'',
  phone:'',
  orderNumber:1,
  itemsOrdered:[],
  price:10,
  orderStatus:'',
  orderTime:'',
  currentItem:'',

}
var userOrder={};      //an item in checkoutInfo.itemsOrdered
var componentWillMount = () => {};
export default class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state={
    count:0,   //
    pausestatus:{kitchenOpen:false,deliveryAvailable:false,ovenOn:false,lateMenu:false},     //contains if the kitchen is open, delivery is On, Late Menu is Only Available etc
    menu:{},              //contains  the available menu 
    userOrder:{}, 
    orderTypeDelivery:true //stores the order made by the customer
  };
};
static navigationOptions = ({ navigation }) => ({
  title: 'Home',
});

SetUpHomescreen =(data)=> {
  this.setState({pausestatus:data.pauseinfo}); //stores the pausestatus, if the kitchen is OPEN, oven is ON
  this.setState({menu:data.list});           //contains the item on the first screen
}

componentWillMount(){   
  console.log('At component will mount')                 //runs as sooon as the component loads

  var request= async()=>{
  //var response=await this.fetchmainmenu('http://162.210.90.60:8000/v5/landing')
  const response=await fetch('http://162.210.90.60:8000/v5/landing');
  const json=await response.json();
  //{await this.SetUphomescreen(response)}
  {this.SetUpHomescreen(json)};
} 
request();

}


Sethomescreen =(data)=> {
  this.setState({pausestatus:data});
//console.log("Printing from the homescreen");
//console.log(this.state);
}






render() {
  const { navigate } = this.props.navigation;
  var kitchenstatus=[];




funcPauseStatus = (i, k) => {                  //returns the string depending upon the status of the kitchen
  if (i.startsWith('k') && k == false) {
    return 'Kitchen Closed';
  } 

  if (i.startsWith('k') && k == true) {
    return 'Kitchen Open';
  }

  if (i.startsWith('d') && k == false) {
    return 'Delivery Unavailable';
  } 

  if (i.startsWith('d') && k == true) {
    return 'Delivery Available';
  }

  if (i.startsWith('o') && k == false) {
    return 'Oven Closed';
  } 

  if (i.startsWith('o') && k == true) {
    return 'Oven Open';
  }

  if (i.startsWith('l') && k == false) {
    return 'Late Menu Unavailable';
  } 

  if (i.startsWith('l') && k == true) {
    return 'Late Menu Available';
  }
}

//   return (
//     <View>
//     <View style={styles.buttonContainer}>
//        {/* <Button
//           title= "Kitchen Open"
//           color="#212121"
//           onPress={this.fetchfromapi}/>

//         <Button
//           title= "Oven Open"
//           color="#212121"
//           onPress={() => {
//     Alert.alert('You tapped the button!');
//   }}
//           />

//         <Button
//           title= "Late Menu"
//           color="#212121"
//           onPress={() => {
//     Alert.alert('You tapped the button!');
//   }}
// />*/}
// {kitchenstatus}

// </View>
// <View>
// <ScrollView>

// <View style={styles.menuContainer}>


// </View>
// <View style={styles.menuContainer}>



// <Image
// style={{width: width/3, height: height/4}}
// source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}}/>



// <Image
// style={{width: width/3, height: height/4}}
// source={{uri: 'https://img.huffingtonpost.com/asset/5899f0e42800001f0099761a.jpeg?cache=f2mrh0z0dn&ops=crop_0_777_1500_1080,scalefit_720_noupscale'}}/>

// </View>


// </ScrollView>
// </View>

// <View style={styles.buttonContainer}>
// <Button
//   title="Next"
//   backgroundColor='#5499C7'
//   raised
//   small
//   onPress={() => {
//     navigate('Pizza');
//     }}/>
//   </View>
// </View>
// );

// }

// // for(var i in this.state.pausestatus){
// //   if (this.state.pausestatus[i]==false){
// //     //console.log("Printing closed services",i);
// //     kitchenstatus.push(<Text style={styles.textFalse}key={i}>

// //       {funcPauseStatus(i, this.state.pausestatus[i])}
// //       </Text>)
// //   }else{
// //     kitchenstatus.push(<Text style={styles.textTrue}key={i}>
// //       {funcPauseStatus(i, this.state.pausestatus[i])}
// //       </Text>)
// //   }
// // }



add_to_Order=(itemname)=>{                                //adds the order in the userOrder and then navigates to the next Screen
  userOrder['category']=itemname.title;
  console.log("THIS IS USER ORDER",userOrder);
  navigate(itemname.title);
}
return (
  <Container>
  <Header>

<Left>
  <Badge success={this.state.pausestatus.deliveryAvailable} first><Icon name='bicycle' />
  </Badge></Left>
 <Left><Badge success={this.state.pausestatus.lateMenu}><Icon name='ios-menu' />
  <Icon ios='logo-apple' style={{fontSize: 20, color: 'red'}}/></Badge></Left>
<Left>
  <Badge success={this.state.pausestatus.ovenOn}><Icon name='ios-ice-cream' />
  <Icon ios='logo-apple' style={{fontSize: 20, color: 'red'}}/></Badge></Left>
<Body> 
<Badge success={this.state.pausestatus.kitchenOpen}><Icon name='ios-nutrition' />
  <Icon ios='logo-apple' style={{fontSize: 20, color: 'red'}}/></Badge></Body>
  <Button 
  success
  transparent
  onPress={() => navigate('Checkout')}
  title= "Checkout" 
  >
  <Text>Checkout</Text>

  </Button>



  </Header>

  <Content>
  <List dataArray={this.state.menu} renderRow={(item)=>
    <Card>
    <CardItem>
    <Left>
    <Thumbnail source={{uri: 'http://162.210.90.60:8000/'+item.image.normal}} />
    <Body>
    <Text style={{fontSize: 20}}>{item.title}</Text>
    </Body>
    </Left>
    </CardItem>
    <CardItem cardBody  button onPress={() => {
      add_to_Order(item);
      checkoutInfo['currentItem'] = item.title.toLowerCase();
      console.log(checkoutInfo['currentItem']);
    }
    }>

    <Image source={{uri: 'http://162.210.90.60:8000/'+item.image.normal}} style={{height: 200, width: null, flex: 1}}/>
    </CardItem>

    </Card>
  }>
  </List>
  </Content>
  <Footer>
  <FooterTab>
  <Button  info  onPress={()=>checkoutInfo['orderTypeDelivery']=true}>
  <Icon name="bicycle" />
  <Text>Delivery</Text>
  </Button>
  <Button info  active onPress={()=>checkoutInfo['orderTypeDelivery']=false}>
  <Icon active name="ios-people" />
  <Text>Pickup</Text>
  </Button>
  </FooterTab>
  </Footer>
  </Container>
  );

}
}

exports.userOrder=userOrder;
exports.checkoutInfo=checkoutInfo;
exports.componentWillMount=componentWillMount;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },

  buttonContainer: {
    margin: 10,

},
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10

  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  },
  textFalse: {
    backgroundColor: '#ABB2B9',
    fontSize: 25,
    margin: 5,
    textAlign: 'center',
    fontWeight: '200'
  },

  textTrue: {
    backgroundColor: '#2ECC71',
    fontSize: 25,
    margin: 5,
    textAlign: 'center',
    fontWeight: '200'
  },
  buttonContainer: {
    margin: 10, 
}

});

