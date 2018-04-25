
import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

const Util = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    post(url, data, callback) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                callback(responseData);
            });
    },
    get(url, callback){
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                callback(responseData);
            })
            .done();
    },
    key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
    px2dp: function(uiElementPx){
        //uiElementPx为设计图像素单位
        const uiWidthPx = 750; //基于iPhone6的750像素
        const deviceWidthDp = Dimensions.get('window').width;
        return uiElementPx *  deviceWidthDp / uiWidthPx;
    }
};

export default Util;