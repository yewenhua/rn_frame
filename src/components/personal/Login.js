'use strict';
import React, {Component} from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { Button, Toast } from 'antd-mobile';

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
            pwd: '',
            activeNode: ''
        };
    }

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'登录'
        });
    }

    signin = async () => {
        if(!this.state.name){
            Toast.info('请输入用户名', 1);
            return false;
        }

        if(!this.state.pwd){
            Toast.info('请输入密码', 1);
            return false;
        }

        await AsyncStorage.setItem('userToken', JSON.stringify({name: this.state.name, pwd: 'this is the wrong one'}));
        this.props.navigation.navigate('App');
    };

    scrollViewTo(param, e) {
        let target = e.nativeEvent.target;
        let scrollLength = 0;//初始值
        if (target === ReactNative.findNodeHandle(this.refs[param])) {
            scrollLength = 216;
        }
        this.refs.scroll.scrollTo({y: scrollLength, x: 0});
        this.setState({
            activeNode: param
        });
    }

    render() {
        return (
            <ScrollView style={{flex: 1}} ref='scroll' keyboardShouldPersistTaps="always">
                <View style={styles.container} onStartShouldSetResponderCapture={(e) => {
                    let target = e.nativeEvent.target;
                    if (target !== ReactNative.findNodeHandle(this.refs.name) ) {
                        this.refs.name.blur();
                    }
                }}>
                    <Image
                        source={require('../../img/logo.png')}
                        style={styles.logo}
                    />
                    <TextInput
                        ref='name'
                        style={[styles.input, styles.name]}
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => this.setState({name})}
                        placeholder="请输入用户名"
                        placeholderTextColor="#C0C0C0"
                        value={this.state.name}
                        onFocus={this.scrollViewTo.bind(this, 'name')}
                        onEndEditing={()=>{this.refs.scroll.scrollTo({y:0,x:0,animated:true})}}
                    />
                    <TextInput
                        ref='pwd'
                        style={[styles.input, styles.pwd]}
                        underlineColorAndroid='transparent'
                        onChangeText={(pwd) => this.setState({pwd})}
                        placeholder="请输入密码"
                        placeholderTextColor="#C0C0C0"
                        value={this.state.pwd}
                        onFocus={this.scrollViewTo.bind(this, 'pwd')}
                        onEndEditing={()=>{this.refs.scroll.scrollTo({y:0,x:0,animated:true})}}
                    />
                    <Button type="primary" style={styles.btn} onClick={this.signin}>登录</Button>
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
                </View>
            </ScrollView>
        );
    }
}

const hairline = StyleSheet.hairlineWidth;
const styles = StyleSheet.create({
    container: {
        height: height,
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

