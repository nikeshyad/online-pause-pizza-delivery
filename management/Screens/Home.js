//This is the home screen for the application

import React from 'react';
import { StyleSheet, View, TextInput, Text} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Button} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'
import { FormLabel, FormInput } from 'react-native-elements';
import { Footer, Header,Title,Container, Content, List, ListItem, InputGroup, Input, Icon, Picker } from 'native-base';

export default class Home extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    Username: '',
    Password: '',
  }
};

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
  });

  componentWillMount() {
      //this.logIn('http://162.210.90.60:7000/v5/login', 'yadav1','abcd')
  }

  //function that takes in url, username and password to log in
  logIn = (url, user, pass) => {
    const {navigate} = this.props.navigation;
      fetch(url, {
        method:'POST',
        body:JSON.stringify({username: user, password: pass}),
        headers: {'Content-Type':'application/json'}
      })
      .then((res)=>
        res.json())
      .then((data)=>{
        if (data.status == false) {
          console.log(data.message);
        } else {
          console.log('Log in Successful');
          Token = data.value;
          console.log(Token);
          exports.setHoursPost = "http://162.210.90.60:7000/v5/" + Token + "/landing/set";
          exports.ingredientsPost = "http://162.210.90.60:7000/v5/" + Token + "/ingredients";
          exports.Orders = "http://162.210.90.60:7000/v5/" + Token + "/orders";
          exports.ordercomplete = "http://162.210.90.60:7000/v5/" + Token + "/ordercomplete";
          navigate('ManagerScreen');
        }
      });
    }

  render() {
    const { params } = this.props.navigation.state;
    return(
    <Container>
      <Content>
        <List>
          <ListItem>
            <InputGroup>
              <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input
                  onChangeText={(text) => this.setState({Username: text})}
                  //value={this.state.email}
                  placeholder={"Username"} />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup>
              <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                <Input
                  onChangeText={(text) => this.setState({Password: text})}
                  //value={this.state.password}
                  secureTextEntry={true}
                  placeholder={"Password"} />
            </InputGroup>
          </ListItem>
        </List>

        <View style={styles.buttonContainer}>
        <Button
          backgroundColor = '#5499C7'
          raised
          large
          onPress = {() => this.logIn('http://162.210.90.60:7000/v5/login', this.state.Username, this.state.Password)}
          title = "Log In"
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
  },

  textStyle: {
    color: '#EC7063',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },

  buttonContainer: {
    margin: 10,
  },

  alignment: {
    marginLeft: '50%'
  },
  buttonalignment: {
    marginRight: '25%'
  },
});
