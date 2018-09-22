//Screen that allows the pause managers to toggle switch an ingredient off if they run out

import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Button} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'
import { Container, Content,ListItem,List,Body,Thumbnail,Right,Footer,FooterTab,Icon } from 'native-base';

var Home = require('./Home');

const {width,height}=Dimensions.get('window');
//var ingredienturl='http://162.210.90.60:8000/v5/ingredients';
var ingredientsResponse;

export default class Ingredients extends React.Component {
  constructor(props){
    super(props);
    this.state={
      ingredients:{},
      notAvailable:[],
      }
    }

  static navigationOptions = ({ navigation }) => ({
    title: 'Ingredients',
  });

  SetUpIngredientScreen=(data)=>{
    this.setState({ingredients:data.list});
    for (i in data.list) {
      if (data.list[i].available == false) {
        this.state.notAvailable.push(data.list[i].title);
      }
    }
    //console.log(this.state.notAvailable)
  }

  //runs as soon as the screen is rendered, stores the ingredients info as a JSON object in ingredientsResponse
  componentWillMount(){
    //Home.logIn('http://162.210.90.60:7000/v5/login', 'yadav1','abcd');
		var request= async(url)=>{
			const response=await fetch(url);
			const json=await response.json();
      ingredientsResponse = json;
			{this.SetUpIngredientScreen(json)};
		}
		request(Home.ingredientsPost);
	}

  //change the status of ingredients availability based on toggle switching the item on or off
  //and send the entire JSON object as a POST request to the server that handles it
  changeAvailableStatus = () => {
    //console.log(this.state.notAvailable)
    for (i in ingredientsResponse.list) {
      var item = ingredientsResponse.list[i].title;
      if (this.state.notAvailable.includes(item)) {
        //console.log(item + ' is not available')
        ingredientsResponse.list[i].available = false;
      } else {
        ingredientsResponse.list[i].available = true;
      }
      //console.log(ingredientsResponse[i].available)
    }
    console.log(Home.ingredientsPost)
    //console.log(ingredientsResponse)

    fetch(Home.ingredientsPost, {
      method:'POST',
      body:JSON.stringify(ingredientsResponse),
      headers: {'Content-Type':'application/json'}
    })
    .then((res)=>
      res.json())
    .then((data)=>{
      //console.log(this.state.notAvailable);
    });
    console.log(this.state.notAvailable)
  }

  //helper function that removes an element from an array
  remove = (array, element) => {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
  }

  render(){
    //console.log(Home.ingredientsPost)
		return(
			<Container>
			<Content>
			<ScrollView style={{height:height/1.3}}>
			<List dataArray={this.state.ingredients} renderRow={(item)=>

				<ListItem>
				<Thumbnail square size={80} source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}} />
				<Body>
				<Text>{`      `+item.title}</Text>
				<Text note>{`      `+ item.type}</Text>
				</Body>
				<Right>
				<ToggleSwitch
        isOn={item.available}
				onColor='#2ECC71'
				offColor='#ABB2B9'
				labelStyle={{fontSize: 25, color: 'black', fontWeight: '200'}}
        onToggle = {(isOn) => {
          if (!isOn) {
            this.setState({notAvailable:[...this.state.notAvailable,item.title]});
          } else {
            this.remove(this.state.notAvailable, item.title)
          }
        }
      }
				/>
				</Right>
				</ListItem>
			}>
			</List></ScrollView>

      <View style={styles.buttonContainer}>
      <Button
            backgroundColor='#5499C7'
            raised
            large
            onPress={() => this.changeAvailableStatus()}
            title= "Submit"
          />
          </View>

			</Content>
			</Container>
			);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  textStyle: {
    color: '#EC7063',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },
  buttonContainer: {
  	margin:10
    },
});
