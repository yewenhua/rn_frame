
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';

const GankIcon = require('../../img/pic.png');
const GankIconFill = require('../../img/pic_fill.png');

let badgeNumber = 11;

export default class Tab2 extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        tabBarOnPress:(({ scene,jumpToIndex})=>{
            jumpToIndex(scene['index']);
        }),
        // 下面就是文章中修改主题色的方法
        headerStyle:{backgroundColor: screenProps ? '#4ECBFC' : '#4ECBFC', height: 48},
        headerTitleStyle: {fontSize:20, color:'white', alignSelf:'center'},
        headerTitle:navigation.state.params ? navigation.state.params.headerTitle : '干货',
        tabBarLabel:navigation.state.params ? navigation.state.params.tabBarLabel : '干货',
        tabBarIcon: (({tintColor,focused}) => {
            if(focused){
                // 做操作
            }
            return(
                <Image
                    // 可以用过判断focused来修改选中图片和默认图片
                    source={!focused ? GankIcon : GankIconFill}
                    // 如果想要图标原来的样子可以去掉tintColor
                    style={[{height:24,width:24 }]}
                />
            )
        }),
        headerRight:(
            <Text style={{color:'red',marginRight:20}} onPress={()=>navigation.state.params.navigatePress()}>我的</Text>
        ),
    })

    componentWillUnmount(){
        //this.subscription.remove();
    };
    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'干货集中营',
            tabBarLabel:'干货',
            navigatePress:this.navigatePress
        });
    }

    navigatePress = () => {
        this.props.navigation.navigate('DrawerOpen');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Test2 !
                </Text>
                <Text style={styles.instructions} onPress={()=>{
              const { navigate } = this.props.navigation;
              navigate('Detail1',{
                  headerTitle:'我是修改后的文字'
              });
          }}>
                    点我跳转到Detail1，跳转的时候携带参数，修改了Detail1的导航栏文字
                </Text>
                <Text style={styles.instructions}>
                    当前页面的Tabbar是通过页面自定义的，图片和颜色都是图片本来的色彩。
                </Text>
            </View>
        );
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
        fontSize:18
    },
});

