import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  StatusBar
} from 'react-native';

import Routers from './src/components/route/Routers'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux';
import {store} from './src/store/index.js';

export default class App extends Component<{}> {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#4ECBFC"
                        hidden={false}
                        barStyle="light-content"
                    />
                    {/*
                     *<Popup ref="popup"/>
                     *<TouchableHighlight onPress={()=>{this.refs.popup.show('title', 'desc', 'meirao', this)}}>
                        *<Text>select</Text>
                     *</TouchableHighlight>
                     *<TabMenu></TabMenu>
                    */}

                    <Routers></Routers>
                </View>
            </Provider>
        );
    }

    componentDidMount() {
        SplashScreen.hide();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});
