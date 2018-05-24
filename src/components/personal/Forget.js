'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
import { Button } from 'antd-mobile';

const {width, height} = Dimensions.get('window');

export default class Forget extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params ? navigation.state.params.headerTitle : '忘记密码',
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
            pwd: '',
            code: '',
            repwd: ''
        };
    }

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'忘记密码'
        });
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.list}>
                <View style={[styles.border, styles.middle]}>
                    <View style={styles.title}>
                        <Text style={styles.text}>手机号码</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => this.setState({name})}
                        placeholder="请输入手机号码"
                        placeholderTextColor="#C0C0C0"
                        value={this.state.name}
                    />
                </View>
                <View style={styles.border}>
                    <View style={styles.title}>
                        <Text style={styles.text}>短信验证</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        onChangeText={(code) => this.setState({code})}
                        placeholder="请输入短信验证码"
                        placeholderTextColor="#C0C0C0"
                        value={this.state.code}
                    />
                    <View style={styles.get}>
                        <Text style={styles.code}>获取验证码</Text>
                    </View>
                </View>
            </View>

            <View style={styles.list}>
                <View style={[styles.border, styles.middle]}>
                    <View style={styles.title}>
                        <Text style={styles.text}>登录密码</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        onChangeText={(pwd) => this.setState({pwd})}
                        placeholder="请输入登录密码"
                        placeholderTextColor="#C0C0C0"
                        value={this.state.pwd}
                    />
                </View>
                <View style={styles.border}>
                    <View style={styles.title}>
                        <Text style={styles.text}>确认密码</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        onChangeText={(repwd) => this.setState({repwd})}
                        placeholder="请输入确认密码"
                        placeholderTextColor="#C0C0C0"
                        value={this.state.repwd}
                    />
                </View>
            </View>

            <Button type="primary" style={styles.btn}>提交</Button>
            <View style={styles.regist}>
                <View style={[styles.left, styles.bright]}>
                    <Text style={styles.forget} onPress={()=>{
                        const { navigate } = this.props.navigation;
                        navigate('Login');
                    }}>登录</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.forget} onPress={()=>{
                        const { navigate } = this.props.navigation;
                        navigate('Forget');
                    }}>注册</Text>
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
        backgroundColor: '#f8f8f8'
    },
    list:{
        marginTop: 20,
        width: width,
        borderTopColor: '#cccccc',
        borderBottomColor: '#cccccc',
        borderTopWidth: hairline,
        borderBottomWidth: hairline,
        backgroundColor: '#ffffff'
    },
    border: {
        width: width - 20,
        height: 48,
        marginLeft: 20,
        padding: 0,
        flexDirection: 'row'
    },
    middle: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: hairline,
    },
    title:{
        height: 48,
        width: 80,
        justifyContent: 'center'
    },
    text:{
        fontSize: 14,
        color: "#333",
        fontWeight: 'bold'
    },
    input:{
        height: 48,
        fontSize: 14,
        flex: 1
    },
    get:{
        position: 'absolute',
        right: 20,
        top: 12,
        height:24,
        borderColor: '#1890FF',
        borderWidth: hairline,
        borderRadius: 15,
        justifyContent: 'center',
        paddingRight: 8,
        paddingLeft: 8
    },
    code: {
        fontSize: 10,
        color: '#1890FF'
    },
    btn: {
        marginTop: 40,
        height: 54,
        width: width - 40,
    },
    regist:{
        marginTop: 20,
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

