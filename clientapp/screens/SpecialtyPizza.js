import React from 'react';
import { Alert, StyleSheet, Text, View,Picker,Dimensions,Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right,List,Footer,FooterTab,Segment,HeaderTab} from 'native-base';
//import {Button} from 'react-native-elements';

const {width,height}=Dimensions.get('window');
export default class SpecialtyP extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      count:0,   //
      specialtyChoice:{},   //contains  the available menu 
      //userOrder:{} //stores the order made by the customer
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Choose Specialty Pizza',
  });


  SetUpScreen =(data)=> {
        this.setState({specialtyChoice:data.list});
        console.log("Printing from the specialty pizza screen");
        console.log(this.state);
      }

      componentWillMount(){
        //async allinfo=
        //var response;
        var request= async()=>{
          //var response=await this.fetchmainmenu('http://162.210.90.60:8000/v5/landing')
          const response=await fetch('http://162.210.90.60:8000/v5/pizza/specialty');
          const json=await response.json();
          //{await this.SetUpScreen(response)}
          {this.SetUpScreen(json)};


        } 
        request();
        
        //console.log(response)
        //this.SetUpScreen(response);
        //console.log("ALLINFO",allinfo);
        //
      }


	render(){

		const { navigate } = this.props.navigation;

    Add_to_Order=(itemname)=>{
        console.log("Coming from card press");
        this.state['userOrder']={itemname}
        //this.setState({userOrder:{...this.state.userOrder,itemname}})
       // this.setState({userOrder:{itemname}});
        console.log(this.state.userOrder.itemspecialty);
        console.log({itemname})
        navigate('Toppings');

        //this.setState({userOrder:itemname});
        //console.log(this.state);
      }

		return(

      <Container>
      <Content>

    <List dataArray={this.state.specialtyChoice} renderRow={(item)=>
    <Card>
     <CardItem cardBody  button onPress={() => Add_to_Order(item.title)}>
      <Left>
      <Thumbnail source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}} />
      <Body>
      <Text>{'Large'}</Text>
      </Body>
      </Left>
      <Right><Button primary><Text>{'Add price'}</Text><Icon name='md-restaurant'/></Button></Right>
      </CardItem>

      <Text>{item.price[0].increment}</Text>

    </Card>
    }>

  </List>
  <List dataArray={this.state.specialtyChoice} renderRow={(item)=>
    <Card>
     <CardItem cardBody  button onPress={() => Add_to_Order(item.title)}>
     <Left>
      <Thumbnail source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}} />
      <Body>
      <Text>{'Small'}</Text>
      </Body>
      <Right><Button primary><Text>{'$10'}</Text><Icon name='md-restaurant'/></Button></Right>
      </Left>
     
    </CardItem>


      <Text>{item.price[1].increment}</Text>


    </Card>
    
  }>
  </List>

  <List dataArray={this.state.specialtyChoice} renderRow={(item)=>


      <Card>
     <CardItem cardBody  button onPress={() => Add_to_Order()}>
     <Image source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}} style={{height: 200, width: null, flex: 1}}/>
    </CardItem>


      <Text>{item.price[2].increment}</Text>


    </Card>
    
  }>
  </List>

  <List dataArray={this.state.specialtyChoice} renderRow={(item)=>


      <Card>
     <CardItem cardBody  button onPress={() => Add_to_Order(item.title)}>
     <Image source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}} style={{height: 200, width: null, flex: 1}}/>
    </CardItem>


      <Text>{item.price[3].increment}</Text>


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