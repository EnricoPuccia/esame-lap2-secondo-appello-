import React, { Component } from 'react';
import { Constants } from 'expo';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Body, Title, Button, Right, Content, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import { SearchBar } from 'react-native-elements'

const URL_OF_MENU ='http://www.dmi.unict.it/~calanducci/LAP2/food.json';

import ListComponent from '../components/ListComponent';
import Details from '../screens/Details';

class Menu extends Component {
  state = {
      list: [],
      loading: true,
      filteredMenu: null
  }
    componentWillMount() {
        this.getMenu();
      }
  render() {
    return (
        <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Your menu</Title>
          </Body>
          <Right>
            <Button transparent onPress={this._navToAdd}>
              <MaterialIcons name='add' size={24} color='white' />
            </Button>
          </Right>
        </Header>
        <Content>
          <SearchBar
            onChangeText={this._filter}
            placeholder='Cerca una pietanza' />
          <ListComponent data={this.state.list} loading={this.state.loading} onDetails={this._details}/>
        </Content>
      </Container>
    );
  }
  getMenu() {
    this.getRemoteMenu();
   }

  getRemoteMenu = () => {
      fetch(URL_OF_MENU).then(response =>
        response.json().then(res => {
          this.setState({ list: res.data, loading: false });
        })
      );
    };
    
  _details = (id) => {
      const item = this.state.list.find(item => item.id===id)
      console.log('an item of menu',item);
      this.props.navigation.navigate('Details', {item});
  }

  _filter = text => {
    const filteredMenu = this.state.list.filter(item => {
      return item.name.toLowerCase().includes(text);
    });
    this.setState({
      filteredMenu
    });
  }; 
}


export default createStackNavigator({
    Home: {
        screen: Menu
    },
    Details: {
        screen: Details
    }
},{
    initialRouteName: 'Home',
    headerMode: 'none',
});


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  }
});
