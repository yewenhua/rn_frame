import {
    StackNavigator
} from 'react-navigation';

import React from 'react';
import Login from '../personal/Login';
import Regist from '../personal/Regist';
import Forget from '../personal/Forget';

export default StackNavigator({
    Login:{
        screen: Login,
    },
    Regist:{
        screen: Regist,
    },
    Forget:{
        screen: Forget,
    },
});




