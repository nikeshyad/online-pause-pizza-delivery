import React from 'react';
import { Alert, StyleSheet, Text, View, Button,ScrollView,Image} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Kitchen extends React.Component{
  constructor(props){
    super(props);
  }
	render(){
     const {navigate}  = this.props.navigation;
		return(
			<View style={styles.container}>
			<Text style={styles.titleText}> Touch item to Add to your order</Text>
			{/*<Text>You are in Kitchen</Text>*/}
			<ScrollView>
			<View style={styles.buttonContainer}>
			<Image 
			style={{width: 200, height: 200}}
			source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}}/>
			<Button
			title="Item1"
      onPress={() => navigate('Toppings')}/>
  			</View>
  			<View style={styles.buttonContainer}>
			<Image 
			style={{width: 200, height: 200}}
			source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}}/>
			<Button
			title="Item2"
			onPress={() => {
    		Alert.alert('You tapped the button!');
  			}}/>
  			</View>
  			<View style={styles.buttonContainer}>
			<Image 
			style={{width: 200, height: 200}}
			source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}}/>
			<Button
			title="Item3"
			onPress={() => {
    		Alert.alert('You tapped the button!');
  			}}/>
  			</View>
  						<View style={styles.buttonContainer}>
			<Image 
			style={{width: 200, height: 200}}
			source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}}/>
			<Button
			title="Item4"
			onPress={() => {
    		Alert.alert('You tapped the button!');
  			}}/>
  			</View>
  						<View style={styles.buttonContainer}>
			<Image 
			style={{width: 200, height: 200}}
			source={{uri: 'http://mybestapizza.com/jsimages/Pizza1.jpg'}}/>
			<Button
			title="Item5"
			onPress={() => {
    		Alert.alert('You tapped the button!');
  			}}/>
  			</View>
			</ScrollView>
			</View>
			);
	}


}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
   buttonContainer: {
   	width:200,
   	height:200,
    margin: 80,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  itemContainer:{
  	margin:80,
  	//flexDirection:'row'
  },
  titleText:{
  	alignItems:'center',
  	//margin:20,
  	fontSize:20,
  	fontWeight:'bold',
  	justifyContent:'center',
  },
});