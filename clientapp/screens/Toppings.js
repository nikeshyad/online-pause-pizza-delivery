import React from 'react';
import { Alert, StyleSheet, Text, View, Picker,ScrollView,Dimensions,FlatList,Switch } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
//import {Button} from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content,ListItem,List,Body,Thumbnail,Right,Footer,Button,FooterTab,Icon } from 'native-base';

const Home=require ('./Home'); 
const {width,height}=Dimensions.get('window');

//contains the ingredients added by the user
/*<Picker
		selectedValue={this.state.selection[0]}
		onValueChange={(itemValue, itemIndex) => this.setState({selection: itemValue})}>
		<Picker.Item label={this.state.selection[0]} value="Pineapple" />
		<Picker.Item label={this.state.selection[1]} value="Pepperoni"/>
		</Picker>
		*/

		export default class Toppings extends React.Component{
			constructor(props){
				super(props);
				this.state={
					ingredients:{},
					added:[],              
					}

				}
				static navigationOptions = ({ navigation }) => ({
					title: 'Toppings',
				});



	getUserOrder=()=>{
		const {navigate} = this.props.navigation;
		//console.log("Coming to User Order");
		Home.userOrder['extraIncrement']=this.state.added;
		Home.checkoutInfo.itemsOrdered.push(Home.userOrder);
		Home.userOrder={};
		//console.log('Home.checkoutInfo',Home.checkoutInfo);
		//console.log('userOrder',Home.userOrder);
		navigate('Home')
	}
	SetUpIngredientScreen=(data)=>{
		this.setState({ingredients:data.list});

	}
	componentWillMount(){
		var ingredienturl='http://162.210.90.60:8000/v5/ingredients';
		var request= async(url)=>{
			const response=await fetch(url);
			const json=await response.json();
			{this.SetUpIngredientScreen(json)};
		} 
		request(ingredienturl);
	}
	render(){
		
		// var added_ingredients=[]
		// for (var i in this.state){
		// 	if (this.state[i]==true){
		// 		added_ingredients.push(<Text style={styles.choices}key={i}>{i}</Text>);
		// 	}
		// }
		return(
			<Container>
			
			<Content>
			<ScrollView style={{height:height/1.8}}>
			<List dataArray={this.state.ingredients} renderRow={(item)=>
				
				<ListItem>
				<Thumbnail square size={80} source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}} />
				<Body>
				<Text>{`      `+item.title}</Text>
				<Text note>{`      `+ item.type}</Text>
				</Body>
				<Right>
				<ToggleSwitch
				isadded={false}
				onColor='#2ECC71'
				offColor='#ABB2B9'
				labelStyle={{fontSize: 25, color: 'black', fontWeight: '200'}}
				onToggle={ (isadded) => {this.setState({added:[...this.state.added,item.title]});Home.checkoutInfo.price=Home.checkoutInfo.price+1}}//adds the price after every ingredient
				/> 
				</Right>
				</ListItem>


			}>
			</List></ScrollView>

			<Text style={styles.textStyle}>Your Choices</Text>
			<Text style={styles.choices}>{`			`+this.state.added}</Text>


			</Content><Footer><FooterTab>
			<Button
			full
			success
			
			
			title= "Price" 
			><Text>{`Price  `+Home.checkoutInfo.price}</Text></Button>
			<Button
			full
			success
			
			onPress={() => this.getUserOrder()}
			title= "Done"><Text>Done</Text></Button>
			</FooterTab></Footer>
			</Container>
			);
	}

}






const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ddd',
	},

	textStyle: {
		backgroundColor: '#BDC3C7',
		fontSize: 30,
		margin: 5,
		textAlign: 'center',
		fontWeight: '200'
	},

	title: {
		backgroundColor: '#BDC3C7',
		fontSize: 30,
		margin: 5,
		textAlign: 'center',
		fontWeight: '200',
	},

	choices: {
		fontSize: 18,
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'center',
		fontWeight: '200',
	},

});