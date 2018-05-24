import {
    DrawerNavigator,
    DrawerItems,
    SafeAreaView
} from 'react-navigation';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';

import Test4 from '../Test4';
import Test5 from '../Test5';

import StackOverTab from './StackOverTab';

// 自定义侧边导航栏
const DrawerContent = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcome}>欢迎</Text>
            </View>
            <DrawerItems {...props} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 100,
        width: '100%'
    },
    welcome: {
        height: 100,
        color: 'green',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    icon: {
        width: 24,
        height: 24
    },
});

export default DrawerNavigator({
    AppStack:{
        screen: StackOverTab,
        navigationOptions: {
            drawerLabel:'抽屉菜单',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../../img/voice_fill.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        }
    },
    Test4:{
        screen: Test4
    },
    Test5:{
        screen: Test5
    }
},{
    drawerWidth: 220, // 抽屉宽
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentComponent: props => <ScrollView><SafeAreaView><DrawerContent {...props} /></SafeAreaView></ScrollView>,  // 自定义抽屉组件
    contentOptions: {
        initialRouteName: 'AppStack', // 默认页面组件
        activeTintColor: '#008AC9',  // 选中文字颜色
        activeBackgroundColor: '#f5f5f5', // 选中背景颜色
        inactiveTintColor: '#000',  // 未选中文字颜色
        inactiveBackgroundColor: '#fff', // 未选中背景颜色
        style: {  // 样式

        }
    }
});





