import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ActivityIndicator } from "react-native";
import {   Content } from 'native-base';

import CardElement from './CardElement';

export default class MenuList extends Component {
  
  render() {
    return (
        <Content>
          {this.props.loading ? (
            <ActivityIndicator/>
          ) : (
            <FlatList
              data={this.props.data}
              renderItem={obj => <CardElement item={obj.item} onPress={this.props.onDetails}/>}
              keyExtractor={item => item.id}
            />
          )}
        </Content>
    );
  }
}