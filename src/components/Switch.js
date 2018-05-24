
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage
} from 'react-native';
import { ActivityIndicator } from 'antd-mobile';

export default class Switch extends Component {
    constructor(props) {
        super(props);
        this.bootstrapAsync();
    }

    bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };


    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

