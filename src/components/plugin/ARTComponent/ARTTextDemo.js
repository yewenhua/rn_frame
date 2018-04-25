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

export default class ARTTextDemo extends Component {

  render() {
    return (
      <View style={styles.container} >
        <StatusBar barStyle='default' />
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/2}style={styles.surface} >
          <Text stroke="purple" x={20} y={20} textAnchor="center">
            STROKED TEXT 还没有找到改变字体大小办法
          </Text>
          <Text stroke="black" x={20} y={80} textAnchor="center">
            元素可以在画布上绘制文字图形
          </Text>
          <Text stroke="green" x={20} y={140} textAnchor="center">
            小米智能家庭👪
          </Text>
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

