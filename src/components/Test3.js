
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';

export default class Test3 extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        tabBarOnPress:(({ scene ,jumpToIndex})=>{
            jumpToIndex(scene['index']);
        }),
    })
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <Text style={styles.welcome}>
                       Welcome to Test3!
                    </Text>
                    <Text style={styles.instructions}>
                    当前页面的Tabbar是在App.js中定义的，通过封装一些方法实现。
                    </Text>
                    <View style={styles.btn}>
                        <Button title={'Animation'} onPress={()=>{
                            this.props.navigation.navigate('Animation')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'TabMenu'} onPress={()=>{
                            this.props.navigation.navigate('TabMenu')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'FlatListDemo'} onPress={()=>{
                            this.props.navigation.navigate('FlatListDemo')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'SwipeList'} onPress={()=>{
                            this.props.navigation.navigate('SwipeList')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'Rotate'} onPress={()=>{
                            this.props.navigation.navigate('Rotate')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'Drawer'} onPress={()=>{
                            this.props.navigation.navigate('Drawer')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'Gesture'} onPress={()=>{
                            this.props.navigation.navigate('Gesture')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'Example'} onPress={()=>{
                            this.props.navigation.navigate('Example')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'Counter'} onPress={()=>{
                            this.props.navigation.navigate('Counter', {name: 'Cat'})
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'ScrollAnimate'} onPress={()=>{
                            this.props.navigation.navigate('ScrollAnimate')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'AnimCustom'} onPress={()=>{
                            this.props.navigation.navigate('AnimCustom')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'ArtCustom'} onPress={()=>{
                            this.props.navigation.navigate('ArtCustom')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'SvgCustom'} onPress={()=>{
                            this.props.navigation.navigate('SvgCustom')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title={'MiCustom'} onPress={()=>{
                            this.props.navigation.navigate('MiCustom')
                        }}/>
                    </View>
                    <View style={[styles.btn, styles.mb]}>
                        <Button title={'Login'} onPress={()=>{
                            this.props.navigation.navigate('Login')
                        }}/>
                    </View>
                </ScrollView>
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
    btn: {
        padding: 5
    },
    mb: {
        marginBottom: 15
    }
});
