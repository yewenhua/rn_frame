import {
    StackNavigator
} from 'react-navigation';

import React from 'react';

import TabNav from './TabNav';
import Detail1 from '../Detail1.js';
import Detail2 from '../Detail2.js';
import Animation from '../Animation.js';
import TabMenu from '../TabMenu.js';
import FlatListDemo from '../FlatListDemo.js';
import SwipeList from '../SwipeList.js';
import Rotate from '../Rotate.js';
import Gesture from '../Gesture.js';
import Example from '../Example.js';
import Counter from '../container/Counter.js';
import ScrollAnimate from '../ScrollAnimate.js';
import AnimCustomCompDemo from '../plugin/AnimationComponent/AnimCustomCompDemo';
import ARTSVGDemo from '../plugin/ARTComponent/ARTSVGDemo';
import SvgExample from '../plugin/Svg/SvgExample';
import MiExample from '../plugin/Mi';
import Category from '../Category';
import SearchResults from '../SearchResults';
import GoodsDetail from '../goods/Detail';
import Cart from '../goods/Cart';
import My from '../personal/My';
import Timeline from '../Timeline';

// 初始化StackNavigator
export default StackNavigator({
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    TabNav:{
        screen: TabNav,
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
    Category:{
        screen: Category,
    },
    SearchResults:{
        screen: SearchResults
    },
    GoodsDetail:{
        screen: GoodsDetail
    },
    Cart:{
        screen: Cart
    },
    My:{
        screen: My
    },
    Timeline:{
        screen: Timeline
    },
},{
    initialRouteName: 'TabNav',
    transitionConfig:()=>({
        //Android中默认的界面切换动画是上下，这里实现左右切换
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





