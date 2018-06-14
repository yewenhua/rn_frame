
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Tab3 extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        tabBarOnPress:(({ scene ,jumpToIndex})=>{
            jumpToIndex(scene['index']);
        }),
    })
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1, width: width}}>
                    <Text style={styles.welcome}>
                       Welcome to Test3!
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
                    <View style={styles.btn}>
                        <Button title={'Cart'} onPress={()=>{
                            this.props.navigation.navigate('Cart')
                        }}/>
                    </View>
                    <View style={[styles.btn, styles.mb]}>
                        <Button title={'Category'} onPress={()=>{
                            this.props.navigation.navigate('Category')
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
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    btn: {
        padding: 5
    },
    mb: {
        marginBottom: 15
    }
});
