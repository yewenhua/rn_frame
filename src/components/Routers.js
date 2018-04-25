import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import Test1 from './Test1.js';
import Test2 from './Test2.js';
import Test3 from './Test3.js';
import Detail1 from './Detail1.js';
import Detail2 from './Detail2.js';
import Animation from './Animation.js';
import TabMenu from './TabMenu.js';
import FlatListDemo from './FlatListDemo.js';
import SwipeList from './SwipeList.js';
import Rotate from './Rotate.js';
import Drawer from './Drawer.js';
import Gesture from './Gesture.js';
import Example from './Example.js';
import Counter from './container/Counter.js';
import ScrollAnimate from './ScrollAnimate.js';
import AnimCustomCompDemo from './plugin/AnimationComponent/AnimCustomCompDemo';
import ARTSVGDemo from './plugin/ARTComponent/ARTSVGDemo';
import SvgExample from './plugin/Svg/SvgExample';
import MiExample from './plugin/Mi';
import Login from './personal/Login';
import Regist from './personal/Regist';
import Forget from './personal/Forget';

const ShiTuIcon = require('../img/record.png');
const MainIcon = require('../img/voice.png');
const ShiTuIconFill = require('../img/record_fill.png');
const MainIconFill = require('../img/voice_fill.png');

/**
 * 1、Test1是通过普通的属性创建的Tabbar和导航
 * 2、Test2是在页面中通过属性创建Tabbar和导航
 * 3、Test3是通过封装navigationOptions实现Tabbar和导航的
 */
const MyTab = TabNavigator({
    Test1: {
        screen: Test1,
        navigationOptions:({navigation,screenProps}) => ({
            headerTitle:'识兔', // 只会设置导航栏文字,
            headerStyle:{
                backgroundColor:'#4ECBFC',
                height: 48
            }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
            headerTitleStyle:{
                fontSize:20,
                color:'white',
                alignSelf:'center'
            }, // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
            gesturesEnabled:true, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
            tabBarVisible:true, // 是否隐藏标签栏。默认不隐藏(true)
            tabBarIcon: (({tintColor, focused}) => {
                return(
                    <Image
                        source={!focused ? ShiTuIcon : ShiTuIconFill}
                        style={{height:24,width:24 }}
                    />
                )
            }), // 设置标签栏的图标。需要单独设置。
            tabBarLabel:'识兔', // 设置标签栏的title。推荐这个方式。
        })
    },
    Test2: {
        screen:Test2,
    },
    Test3:{
        screen:Test3,
        navigationOptions: ()=> TabOptions('我的' ,MainIcon, MainIconFill, '我的'),
    },
},{
    tabBarPosition:'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled:false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy:true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName:'', // 设置默认的页面组件
    backBehavior:'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions:{
        activeTintColor:'#1AAD19', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor:'#999999', // label和icon的前景色 不活跃状态下(未选中)。
        activeBackgroundColor:'blue', //label和icon的背景色 活跃状态下（选中） 。
        inactiveBackgroundColor:'green', // label和icon的背景色 不活跃状态下（未选中）。
        showLabel:true, // 是否显示label，默认开启。
        showIcon:true, // 是否显示图标，默认关闭。
        upperCaseLabel:false, // 是否使标签大写，默认为true。
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 12,
            paddingVertical: 0,
            marginVertical: 0
        },
        tabStyle: {
            //paddingVertical: 0,
            //marginVertical: 0
        }
    }
});

// 初始化StackNavigator
export default  MyApp = StackNavigator({
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    MyTab:{
        screen: MyTab,
    },
    // 将需要跳转的页面注册在这里，全局才可以跳转
    Detail1:{
        screen:Detail1
    },
    Detail2:{
        screen:Detail2,
    },
    Animation:{
        screen: Animation,
    },
    TabMenu:{
        screen:TabMenu,
    },
    FlatListDemo:{
        screen:FlatListDemo,
        navigationOptions: ({navigation}) => ({
            title: 'FlatListDemo',
            headerStyle:{
                backgroundColor:'#4ECBFC',
                height: 48
            },
            headerTitleStyle:{
                fontSize:20,
                color:'white',
                alignSelf:'center'
            }
        }),
    },
    SwipeList:{
        screen:SwipeList,
    },
    Rotate:{
        screen:Rotate,
    },
    Drawer:{
        screen:Drawer,
    },
    Gesture:{
        screen:Gesture,
    },
    Example:{
        screen:Example,
    },
    Counter:{
        screen: Counter,
        path: 'app/:name',
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}'s Counter`,
            headerStyle:{
                backgroundColor:'#4ECBFC',
                height: 48
            },
            headerTitleStyle:{
                fontSize:20,
                color:'white',
                alignSelf:'center'
            }
        }),
    },
    ScrollAnimate:{
        screen:ScrollAnimate,
    },
    AnimCustom:{
        screen:AnimCustomCompDemo,
    },
    ArtCustom:{
        screen:ARTSVGDemo,
    },
    SvgCustom:{
        screen:SvgExample,
    },
    MiCustom:{
        screen:MiExample,
    },
    Login:{
        screen: Login,
    },
    Regist:{
        screen: Regist,
    },
    Forget:{
        screen: Forget,
    },
},{
    transitionConfig:()=>({
        //Android中默认的界面切换动画是上下，这里实现左右切换
        //screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
    navigationOptions: ({navigation}) => ({
        headerStyle:{
            backgroundColor:'#4ECBFC',
            height: 48
        },
        headerTitleStyle:{
            fontSize:20,
            color:'white',
            alignSelf:'center'
        }
    }),
});

const TabOptions = (tabBarTitle, normalImage, selectedImage, navTitle) => {
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
                style={{height:24, width:24 }}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:20, color:'white', alignSelf:'center'};
    const headerStyle = {backgroundColor:'#4ECBFC', height: 48};
    const tabBarVisible = true;
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};

