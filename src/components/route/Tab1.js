
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  NetInfo,
  CameraRoll,
  Button,
  Alert
} from 'react-native';
import { ActivityIndicator } from 'antd-mobile';
import JPushModule from 'jpush-react-native';
import * as WeChat from 'react-native-wechat';
import Alipay from '../libs/Alipay';
import Utils from '../Utils';

const Geolocation = require('Geolocation');

export default class Tab1 extends Component {
    constructor(props){
        super(props);
        this.state={
            pushMsg: '',
            notification: '',
            paying: false,
            payparam: ''
        };

        this._xhr = null;
    }

    getLocation(){
        Geolocation.getCurrentPosition((data)=>{
            alert('success:' + JSON.stringify(data));
        }, (err)=>{
            alert('fail:' + JSON.stringify(err));
        });
    }

    getNetInfo(){
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            alert(JSON.stringify(connectionInfo));
        });

        function handleFirstConnectivityChange(connectionInfo) {
            alert('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            NetInfo.removeEventListener(
                'connectionChange',
                handleFirstConnectivityChange
            );
        }

        NetInfo.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );
    }

    getPhotos(){
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
        .then(r => {
            alert('success:' + JSON.stringify(r.edges));
        })
        .catch((err) => {
            alert('fail:' + JSON.stringify(err));
        });
    }

    submitAlipay = () => {
        this.setState({
            paying: true,
        });

        //http请求服务获取支付参数及RSA数字签名信息
        this._xhr && this._xhr.abort();

        var xhr = this._xhr || new XMLHttpRequest();
        this._xhr = xhr;

        xhr.onerror = ()=> {
            this.setState({
                paying: false,
            });

            Alert.alert(
                '请求出错',
                `状态码: ${xhr.status}, 错误信息: ${xhr.responseText}`
            )
        }

        xhr.ontimeout = () => {
            this.setState({
                paying: false,
            });

            Alert.alert(
                '',
                '请求超时'
            )
        }

        //let server_api_url = '获取支付宝参数信息的服务器接口url地址'
        //let params = '提交的参数, 例如订单号信息'
        //let appScheme = 'ios对应URL Types中的URL Schemes的值, 会影响支付成功后是否能正确的返回app'
        let server_api_url = 'http://www.ziyivip.com/alipay/generateOrderInfo';  //内部测试地址, 需自行修改
        let params = 'oid=3428a92f55bff7920155c2e4cc790062'; //提交参数, 需自行修改
        let appScheme = 'reactnativecomponent';

        xhr.open('POST', server_api_url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = () => {
            if (xhr.status !== 200) {
                this.setState({
                    paying: false,
                });

                Alert.alert(
                    '请求失败',
                    `HTTP状态码: ${xhr.status}`
                )
                return;
            }
            if (!xhr.responseText) {
                this.setState({
                    paying: false,
                });

                Alert.alert(
                    '请求失败',
                    '没有返回信息'
                )
                return
            }
            let responseJSON = JSON.parse(xhr.responseText)
            //let orderText = decodeURIComponent(responseJSON.result)
            let orderText = responseJSON.result;
            console.log(`响应信息: ${xhr.responseText}`);
            console.log('0000000000000000000');
            console.log(orderText);
            this.setState({
                payparam: orderText
            });
            /*
             * 服务端获取支付宝SDK快捷支付功能所需参数字串示例(对应下面的orderText)
             * partner="2088021133166364"&seller_id="koa@sh-defan.net"&out_trade_no="160707414842102"&subject="到途订单-160707414842102"&body="营养快线水果酸奶饮品（椰子味）,500ml,4;正宗凉茶,310ML,4;原味味奶茶,80g,6;"&total_fee="0.01"&notify_url="http://f154876m19.imwork.net:16374/pay/paymentCompletion"&service="mobile.securitypay.pay"&payment_type="1"&_input_charset="utf-8"&it_b_pay="-644885m"&return_url="m.alipay.com"&sign="iW5aK2dEsIj8nGg%2BEOOlMcyL081oX%2F2zHNcoJRrlO3qWmoVkXJM%2B2cHH9rSDyGYAeKxRD%2BYwrZK3H3QYb%2Fxi6Jl%2BxJVcvguluXbKvmpKjuuBv2gcOyqtydUMHwpdAVN%2BTwbQ6Zt8LU9xLweua7n%2FLuTFdjyePwf5Zb72r21v5dw%3D"&sign_type="RSA"
             */
            console.log(`获取支付宝参数成功, decodeURIComponent -> orderText = ${orderText}`);

            (async ()=>{
                try {
                    let ret = await Alipay.pay(this.state.payparam); // 调起支付宝，发起支付
                    Alert.alert(
                        '',
                        `${ret.resultStatus == 9000 ? '支付成功' : '支付失败'} `
                    );

                    this.setState({
                        paying: false,
                        pushMsg: JSON.stringify(ret)
                    });
                }
                catch (err) {
                    console.log(err);
                    this.setState({
                        paying: false
                    });
                    Alert.alert('99999999' + JSON.stringify(err));
                }
            })();
        }

        xhr.timeout = 30000
        xhr.send(params)
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Tab1 ! {this.state.pushMsg}
                </Text>
                <View style={styles.btn}>
                    <Button title={'点我跳转到Detail1 ' + this.state.notification} onPress={()=>{
                        const { navigate } = this.props.navigation;
                        navigate('Detail1');
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'Detail2中有reset和navigate的使用方法'} onPress={()=>{
                        const { navigate } = this.props.navigation;
                        navigate('Detail2');
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'抽屉菜单'} onPress={()=>{
                        this.props.navigation.navigate('DrawerOpen');
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'微信分享好友的文本'} onPress={()=>{
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.shareToSession({type: 'text', description: '测试微信好友分享的文本内容'})
                                    .catch((error) => {
                                        Alert.alert(error.message);
                                    });
                                } else {
                                    Alert.alert('请安装微信');
                                }
                            });
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'微信分享好友的链接'} onPress={()=>{
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.shareToSession({
                                        title:'微信好友测试的链接标题',
                                        description: '分享的内容描述',
                                        thumbImage: '缩略图',
                                        type: 'news',
                                        webpageUrl: 'https://maoxy.com/fish' //分享的链接
                                    })
                                    .then((data)=>{
                                        Alert.alert('success:' + JSON.stringify(data));
                                    })
                                    .catch((error) => {
                                        Alert.alert('fail:' + JSON.stringify(error));
                                    });
                                } else {
                                    Alert.alert('请安装微信');
                                }
                            });
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'微信朋友圈分享的文本'} onPress={()=>{
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享的文本内容'})
                                    .catch((error) => {
                                        Alert.alert(error.message);
                                    });
                                } else {
                                    Alert.alert('请安装微信');
                                }
                            });
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'微信朋友圈分享的链接'} onPress={()=>{
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.shareToTimeline({
                                        title:'分享的链接标题',
                                        description: '分享的内容描述',
                                        thumbImage: '缩略图',
                                        type: 'news',
                                        webpageUrl: 'https://maoxy.com/fish'
                                    })
                                    .then((data)=>{
                                        Alert.alert('success:' + JSON.stringify(data));
                                    })
                                    .catch((error) => {
                                        Alert.alert('fail:' + JSON.stringify(error));
                                    });
                                } else {
                                    Alert.alert('请安装微信');
                                }
                            });
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'微信登录'} onPress={()=>{
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.sendAuthRequest("snsapi_userinfo", "antui")
                                    .then((data)=>{
                                        Alert.alert('success:' + JSON.stringify(data));
                                    })
                                    .catch((error) => {
                                        Alert.alert('fail:' + JSON.stringify(error));
                                    });
                                } else {
                                    Alert.alert('请安装微信');
                                }
                            });
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'微信支付'} onPress={()=>{
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.pay({
                                        partnerId: '',  // 商家向财付通申请的商家id
                                        prepayId: '',   // 预支付订单
                                        nonceStr: '',   // 随机串，防重发
                                        timeStamp: '',  // 时间戳，防重发
                                        package: '',    // 商家根据财付通文档填写的数据和签名
                                        sign: ''        // 商家根据微信开放平台文档对数据做的签名
                                    })
                                    .then((data)=>{
                                        Alert.alert('支付成功');
                                    })
                                    .catch((error) => {
                                        Alert.alert(error.message);
                                    });
                                } else {
                                    Alert.alert('请安装微信');
                                }
                            });
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'支付宝支付'} onPress={()=>{
                        this.submitAlipay();
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'My'} onPress={()=>{
                        this.props.navigation.navigate('My')
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'Timeline'} onPress={()=>{
                        this.props.navigation.navigate('Timeline')
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'地理位置'} onPress={()=>{
                        this.getLocation();
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'网络信息'} onPress={()=>{
                        this.getNetInfo();
                    }}/>
                </View>
                <View style={styles.btn}>
                    <Button title={'照片信息'} onPress={()=>{
                        this.getPhotos();
                    }}/>
                </View>
                <ActivityIndicator size="large" animating={this.state.paying} style={styles.loading}/>
            </ScrollView>
        );
    }

    componentDidMount() {
        try {
            WeChat.registerApp('wx45d7046006e88747');
        } catch (e) {
            Alert.alert('微信SDK错误');
        }

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
            this.props.navigation.navigate("Category");
        });

        //this.getLocation();
        //this.getNetInfo();
        //this.getPhotos();
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
        JPushModule.removeReceiveOpenNotificationListener();
        JPushModule.clearAllNotifications();

        this._xhr && this._xhr.abort();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
  },
  btn: {
     paddingHorizontal:8,
     paddingVertical: 5
  },
  loading: {
      position: 'absolute',
      top: Utils.size.height/2,
      left: Utils.size.width
  }
});

