import {
    TabNavigator
} from 'react-navigation';

import React from 'react';
import {
    Image
} from 'react-native';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

const ShiTuIcon = require('../../img/record.png');
const MainIcon = require('../../img/voice.png');
const ShiTuIconFill = require('../../img/record_fill.png');
const MainIconFill = require('../../img/voice_fill.png');

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

/**
 * 1、Tab1是通过普通的属性创建的Tabbar和导航
 * 2、Tab2是在页面中通过属性创建Tabbar和导航
 * 3、Tab3是通过封装navigationOptions实现Tabbar和导航的
 */
export default TabNavigator({
    Tab1: {
        screen: Tab1,
        path: '/Tab1Tab',
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
    Tab2: {
        screen:Tab2,
        path: '/Tab2Tab',
    },
    Tab3:{
        screen:Tab3,
        path: '/Tab3Tab',
        navigationOptions: ()=> TabOptions('我的' ,MainIcon, MainIconFill, '我的'),
    },
},{
    tabBarPosition:'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled:false, // 是否允许在标签之间进行滑动。
    animationEnabled: true, // 是否在更改标签时显示动画。
    lazy:true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName:'Tab1', // 设置默认的页面组件
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






