//Contains information about the available Pizza Sizes and their prices


import React from 'react';
import { Alert, StyleSheet, Text, View,Picker,Dimensions,Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Col, Grid, Button, Icon, Left, Badge,Body, Right,List,Footer,FooterTab,Segment,HeaderTab} from 'native-base';
const Home=require ('./Home');                //Need to import because the global variable userOrder needs to be updated the user clicks on any of the items in this screen

const {width,height}=Dimensions.get('window');
export default class Size extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      options: {
        pizzaprice:{},
        addableIngredientTypes:[],
        freeIngredients:[],
      }   //
    };
  };

  static navigationOptions = ({ navigation }) => ({                 //Sets the title on the top
    title: 'Size',
  });


  SetUpScreen =(data)=> {                    //It updates the options inside the this.state to contain the information from the api
    //console.log(data.price);
    this.setState( {
      options: {
        pizzaprice: data.price,
        addableIngredientTypes:data.addableIngredientTypes,
        freeIngredients:data.freeIngredients,

      }
    });
    console.log(this.state.options);
  }

  componentWillMount(){                    //This function runs first. It fetches the from pizza build api and then calls SetUpScreen which sets the options through setState.
    var request= async()=>{
      const response=await fetch('http://162.210.90.60:8000/v5/'+ Home.checkoutInfo.currentItem);
      const json=await response.json();
      {this.SetUpScreen(json.list[0])};
    } 
    request();
  }


  render(){
    const { navigate } = this.props.navigation;

    add_Toppings=(itemname)=>{                                  //When the user presses on any of the items, Add_to_Order gets called, which further stores the item and then navigates to the Toppings screen
      Home.userOrder['increment']=itemname.increment;
      Home.checkoutInfo.price=itemname.price;               //sets the price of the item
      navigate('Toppings');                                 //navigates to the toppings screen
    }

    return(
<Container>
<Content>
<List dataArray={this.state.options.pizzaprice} renderRow={(item)=>
    <Card>
    <CardItem button onPress={() => add_Toppings(item)}>
    <Left>
    <Thumbnail source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}} />
    <Body>
    <Text>{item.increment}</Text>
    </Body>
    </Left>
    <Right>
    <Button success onPress={()=> add_Toppings(item)}><Icon name='ios-pricetags'/><Text>{`$ `+item.price}</Text><Icon name='arrow-forward'/></Button>
    </Right>
    </CardItem>
    <CardItem>
    <Left>
    <Text>{`Free Ingredients: `+this.state.options.freeIngredients}</Text>
    </Left>
    
    </CardItem>
    <CardItem>
    <Left>
    <Text>{`Addable: `+this.state.options.addableIngredientTypes}</Text>
    </Left>
    
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