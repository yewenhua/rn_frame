
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import JPushModule from 'jpush-react-native';

export default class Test1 extends Component {
    constructor(props){
        super(props);
        this.state={
            pushMsg: '',
            notification: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                  Welcome to Test1 ! {this.state.pushMsg}
                </Text>
                <Text style={styles.instructions} onPress={()=>{
                      const { navigate } = this.props.navigation;
                      navigate('Detail1');
                }}>
                  点我跳转到Detail1 {this.state.notification}
                </Text>
                <Text style={styles.instructions} onPress={()=>{
                  const { navigate } = this.props.navigation;
                      navigate('Detail2');
                }}>
                  在Detail2中有reset和navigate的使用方法(点文字跳转)
                </Text>
            </View>
        );
    }

    componentDidMount() {
        // 在收到点击事件之前调用此接口
        JPushModule.notifyJSDidLoad((resultCode) => {
            if (resultCode === 0) {
                this.setState({pushMsg: 'init JPush'});
            }
        });

        // 接收自定义消息
        JPushModule.addReceiveCustomMsgListener((message) => {
            this.setState({pushMsg: message.message});
        });

        // 接收推送通知
        JPushModule.addReceiveNotificationListener((message) => {
            this.setState({notification: message.alertContent});
        });

        // 打开通知
        JPushModule.addReceiveOpenNotificationListener((map) => {
            // 可执行跳转操作，也可跳转原生页面
            this.props.navigation.navigate("Login");
        });
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
        JPushModule.removeReceiveOpenNotificationListener();
        JPushModule.clearAllNotifications();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop:10,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 18,
  },
});

