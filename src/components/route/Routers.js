import React from 'react';
import {
    SwitchNavigator
} from 'react-navigation';
import Switch from '../Switch';
import DrawerMenu from './DrawerMenu';
import AuthStack from './AuthStack';


export default SwitchNavigator(
    {
        Switch: Switch,
        App: DrawerMenu,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Switch',
    }
);



