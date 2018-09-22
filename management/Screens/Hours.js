//Screen where you can set up hours for opening and closing time for the pause kitchen

import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Dimensions, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Button, FormLabel, FormInput} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'
import TimePicker from 'react-native-simple-time-picker';
import { Footer, Header,Title,Container, Content, List, ListItem, InputGroup, Input, Icon } from 'native-base';

var Home = require('./Home');
var pauseHours;
const {width,height}=Dimensions.get('window');

export default class Hours extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    openTime: '',
    closeTime: '',
    selectedDay: '',
    selectedParam: '',
  }
};
  static navigationOptions = ({ navigation }) => ({
    title: 'Pause Hours',
  });

  //this will get executed as soon as the screen is rendered. pauseHours is a JSON object that that stores the data
  //after pulling from api endpoint
  componentWillMount(){
		var request = async(url)=>{
			const response = await fetch(url);
			const json = await response.json();
      pauseHours = json;
		}
		request(Home.setHoursPost);
    console.log(Home.setHoursPost)
	}

  //function that changes the opening and closing time based on user input
  changeHours = () => {
    for (i in pauseHours.list) {
      if (pauseHours.list[i].parameter == this.state.selectedParam) {
        if (this.state.selectedDay == "Sunday") {
          pauseHours.list[i].times.Sunday.open = this.state.openTime
          pauseHours.list[i].times.Sunday.close = this.state.closeTime
        } else if (this.state.selectedDay == "Monday") {
          pauseHours.list[i].times.Monday.open = this.state.openTime
          pauseHours.list[i].times.Monday.close = this.state.closeTime
        } else if (this.state.selectedDay == "Tuesday") {
          pauseHours.list[i].times.Tuesday.open = this.state.openTime
          pauseHours.list[i].times.Tuesday.close = this.state.closeTime
        } else if (this.state.selectedDay == "Wednesday") {
          pauseHours.list[i].times.Wednesday.open = this.state.openTime
          pauseHours.list[i].times.Wednesday.close = this.state.closeTime
        } else if (this.state.selectedDay == "Thursday") {
          pauseHours.list[i].times.Thursday.open = this.state.openTime
          pauseHours.list[i].times.Thursday.close = this.state.closeTime
        } else if (this.state.selectedDay == "Friday") {
          pauseHours.list[i].times.Friday.open = this.state.openTime
          pauseHours.list[i].times.Friday.close = this.state.closeTime
        } else if (this.state.selectedDay == "Saturday") {
          pauseHours.list[i].times.Saturday.open = this.state.openTime
          pauseHours.list[i].times.Saturday.close = this.state.closeTime
        }
      }
    }

    console.log(pauseHours)

    //after modifying the JSON object, send a POST request to the server 
    fetch(Home.setHoursPost, {
      method:'POST',
      body:JSON.stringify(pauseHours),
      headers: {'Content-Type':'application/json'}
    })
    .then((res)=>
      res.json())
    .then((data)=>{
      console.log('Posting pause hours');
    });

  }

  render() {

    const { params } = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    return (

    <View style={styles.container}>

    <Picker
      selectedValue={this.state.selectedDay}
      onValueChange={(itemValue, itemIndex) => this.setState({selectedDay: itemValue})}>
      <Picker.Item label="Sunday" value="Sunday" />
      <Picker.Item label="Monday" value="Monday" />
      <Picker.Item label ="Tuesday" value ="Tuesday" />
      <Picker.Item label ="Wednesday" value ="Wednesday" />
      <Picker.Item label ="Thursday" value ="Thursday" />
      <Picker.Item label ="Friday" value ="Friday" />
      <Picker.Item label ="Saturday" value ="Saturday" />
    </Picker>

    <Text style={styles.textStyle}>Day</Text>

    <Picker
      selectedValue={this.state.selectedParam}
      onValueChange={(itemValue, itemIndex) => this.setState({selectedParam: itemValue})}>
      <Picker.Item label="Kitchen Open" value="kitchenOpen" />
      <Picker.Item label="Delivery Available" value="deliveryAvailable" />
      <Picker.Item label ="Oven On" value ="ovenOn" />
      <Picker.Item label ="Late Menu" value ="lateMenu" />
    </Picker>

    <Text style={styles.textStyle}>Parameter</Text>

    <Container>
      <Content>
        <List>
          <ListItem>
            <InputGroup>
                <Input
                  onChangeText={(text) => this.setState({openTime: text})}
                  placeholder={"Open Time"} />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup>
                <Input
                  onChangeText={(text) => this.setState({closeTime: text})}
                  placeholder={"Close Time"} />
            </InputGroup>
          </ListItem>
        </List>
        </Content>
        </Container>

    <ScrollView style={{height:height}}>
    <Button
        backgroundColor = '#5499C7'
        raised
        small
        onPress = {() => this.changeHours()}
        title = "Submit"
      />

    </ScrollView>
    </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  textStyle: {
    color: '#EC7063',
    //fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 0,
  },

  buttonContainer: {
    margin: 10
  },
});
