
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// 自定义Header，覆盖系统提供的
export default class NavStyle extends Component {
  static defaultProps={
      backgroundColor:'#4ECBFC'
  };
  render() {
    return (
      <View style={[styles.container,{backgroundColor:this.props.backgroundColor}]}>
        <Text style={styles.leftStyle} onPress={()=>this.props.leftClick()}>
          返回
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:48,
    // backgroundColor:'#4ECBFC',
    flexDirection:'row',
  },
  leftStyle:{
    marginLeft:10,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    color: 'white'
  },

});

