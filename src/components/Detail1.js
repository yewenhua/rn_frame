/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import PullRefresh from './PullRefresh'
import Utils from './Utils'
import Storage from './Storage'

export default class Detail1 extends Component {


    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params?navigation.state.params.headerTitle:'Detail1',
        headerRight:(
            <Text style={{color:'red',marginRight:20}} onPress={()=>navigation.state.params?navigation.state.params.navigatePress():null}>退出</Text>
        ),
        headerStyle:{
            backgroundColor:'#4ECBFC',
            height: 48
        },
        headerTitleStyle:{
            fontSize:20,
            color:'white',
            alignSelf:'center'
        },
        // 设置滑动返回的距离
        gestureResponseDistance:{horizontal:300},

    });

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'Detail1',
            navigatePress:this.navigatePress,
        });
    }

    navigatePress = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    _onRefresh(cb){
        //alert('onRefresh');
        cb();
    }

    render() {
        return (
            <View style={styles.container}>
              <PullRefresh ref="Test" style={styles.refresh} onRefresh={this._onRefresh}>
                  <View style={styles.refresh}>
                      <Text style={styles.welcome}>
                        Welcome to Detail1!试着下拉看看
                      </Text>
                      <Text style={styles.instructions} onPress={()=>{
                          const { navigate } = this.props.navigation;
                          navigate('Detail2');
                      }}>
                        跳转到Detail2
                      </Text>
                      <Text style={styles.instructions} onPress={()=>{
                          let res = Storage.save('key', {id: 1, name: 'kitty'});
                          res.then((data)=>{
                              alert(JSON.stringify(data));
                          });
                      }}>
                          存储数据到本地
                      </Text>
                      <Text style={styles.instructions} onPress={()=>{
                          let res = Storage.get('key');
                          res.then((data)=>{
                              alert(JSON.stringify(data));
                          });
                      }}>
                          获取本地存储数据
                      </Text>
                      <Text style={styles.instructions} onPress={()=>{
                          let res = Storage.save('key', {id: 1, name: 'world'});
                          res.then((data)=>{
                              alert(JSON.stringify(data));
                          });
                      }}>
                          修改本地存储数据
                      </Text>
                      <Text style={styles.instructions} onPress={()=>{
                          let res = Storage.delete('key');
                          res.then((data)=>{
                              alert(JSON.stringify(data));
                          });
                      }}>
                          删除本地存储数据
                      </Text>
                  </View>
              </PullRefresh>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Utils.size.width,
        height: Utils.size.height,
        backgroundColor: '#F5FCFF',
    },
    refresh:{
        width: Utils.size.width,
        height: Utils.size.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,

    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize:18
    },
});

