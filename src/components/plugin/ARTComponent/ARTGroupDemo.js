'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    WebView,
    View,
    StatusBar,
    Platform,
    Dimensions,
    ART
} from 'react-native';

var {
  width,
  height
} = Dimensions.get('window');

var {
  Surface,
  Shape,
  Path,
  Text,
  Group
} = ART;


export default class ARTGroupDemo extends Component {

  render() {
    return (
      <View style={styles.container} >
        <StatusBar barStyle='default' />
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/2}style={styles.surface} >
          <Group x={100} y={120}>
            <Text stroke="purple" y={20}>
              STROKED TEXT
            </Text>
            <Text stroke="blue" y={60}>
              这三行继承了Group的属性
            </Text>
            <Text stroke="green" y={100}>
              小米智能家庭👪
            </Text>
          </Group>
        </Surface>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 64 : 76,
        flexDirection:'column',
        flex:1,
    },
    surface:{
      flex:1,
    }

});
