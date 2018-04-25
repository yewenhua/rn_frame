'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput
} from 'react-native';
import { Button } from 'antd-mobile';

const {width, height} = Dimensions.get('window');

export default class Login extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params ? navigation.state.params.headerTitle : '登录',
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

    constructor() {
        super(...arguments);
        this.state = {
            name: '',
            pwd: ''
        };
    }

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'登录'
        });
    }

    render() {
        return <View style={styles.container}>
            <Image
                source={require('../../img/logo.png')}
                style={styles.logo}
            />
            <TextInput
                style={[styles.input, styles.name]}
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({name})}
                placeholder="请输入用户名"
                placeholderTextColor="#C0C0C0"
                value={this.state.name}
            />
            <TextInput
                style={[styles.input, styles.pwd]}
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({name})}
                placeholder="请输入密码"
                placeholderTextColor="#C0C0C0"
                value={this.state.name}
            />
            <Button type="primary" style={styles.btn}>登录</Button>
            <View style={styles.regist}>
                <View style={[styles.left, styles.bright]}>
                    <Text style={styles.forget} onPress={()=>{
                        const { navigate } = this.props.navigation;
                        navigate('Regist');
                    }}>注册账号</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.forget} onPress={()=>{
                        const { navigate } = this.props.navigation;
                        navigate('Forget');
                    }}>忘记密码</Text>
                </View>
            </View>
        </View>;
    }
}

const hairline = StyleSheet.hairlineWidth;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    logo:{
        marginTop: 50,
        width: 100,
        height: 100,
        borderRadius: 50
    },
    input: {
        width: width - 40,
        height: 48,
        borderBottomColor: '#cccccc',
        borderBottomWidth: hairline,
        padding: 0,
    },
    name: {
        position: 'absolute',
        top: 199,
        left: 20,
    },
    pwd: {
        position: 'absolute',
        top: 261,
        left: 20,
    },
    btn: {
        position: 'absolute',
        top: 351,
        left: 20,
        height: 54,
        width: width - 40,
    },
    regist:{
        position: 'absolute',
        top: 432,
        left: 20,
        height: 30,
        width: width - 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    left:{
        width: (width - 40)/2,
        height: 22,
        alignItems: 'flex-end',
        paddingRight: 15,
    },
    right:{
        width: (width - 40)/2,
        height: 22,
        alignItems: 'flex-start',
        paddingLeft: 15
    },
    bright: {
        borderRightColor: '#cccccc',
        borderRightWidth: hairline,
    }
});

