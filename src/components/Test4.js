
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import Lightbox from 'react-native-lightbox';
import * as Animatable from 'react-native-animatable';

export default class Test4 extends Component {

    static navigationOptions = {
        drawerLabel: '首页',
        drawerIcon:({tintColor}) => (
            <Image
                source={require('../img/voice_fill.png')}
                style={[styles.icon, {tintColor: tintColor}]}/>
        ),
    };

    render() {
        const LightboxView = ({ navigator }) => (
            <Lightbox>
                <Image
                    style={{ height: 300, width: 300 }}
                    source={require('../img/1.jpg')}
                />
            </Lightbox>
        );

        return(
            <View style={{flex:1}}>
                <View style={{padding:15}}>
                    <Text onPress={this._skip.bind(this)}>点击跳转</Text>
                </View>
                <View style={{padding:15}}>
                    <Button
                        onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        title="点击打开侧滑菜单"
                    />
                </View>
                <LightboxView></LightboxView>
                <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text>
                <Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate">Up and down you go</Animatable.Text>
                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤</Animatable.Text>
            </View>
        );
    }

    _skip() {
        this.props.navigation.navigate("Test5");
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24
    },
});