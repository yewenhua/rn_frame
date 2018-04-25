import React, {Component} from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    Image,
    View,
    ScrollView
} from 'react-native';
import Dimensions from 'Dimensions';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default class ScrollAnimate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xOffset: new Animated.Value(1.0)
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true} //水平滑动
                            showsHorizontalScrollIndicator={false}
                            style={{width:deviceWidth,height:deviceHeight}}//设置大小
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {x: this.state.xOffset}}}]//把contentOffset.x绑定给this.state.xOffset
                            )}
                            scrollEventThrottle={100}//onScroll回调间隔
                >
                    <Animated.Image source={require('../img/agrass.png')}
                                    style={{height:deviceHeight,
                                        width:deviceWidth,
                                        opacity:this.state.xOffset.interpolate({//映射到0.0,1.0之间
                                            inputRange: [0, deviceWidth],
                                            outputRange: [1.0, 0.0]
                                        }),}}
                                    resizeMode="cover"
                    />
                    <Animated.Image source={require('../img/tumblr.png')}
                                    style={{height:deviceHeight,
                                        width:deviceWidth,
                                        opacity:this.state.xOffset.interpolate({//映射到0.0,1.0之间
                                            inputRange: [deviceWidth, 2*deviceWidth],
                                            outputRange: [1.0, 0.0]
                                        }),}}
                                    resizeMode="cover"
                    />
                    <Animated.Image source={require('../img/day3.png')}
                                    style={{height:deviceHeight,
                                        width:deviceWidth,
                                        opacity:this.state.xOffset.interpolate({//映射到0.0,1.0之间
                                            inputRange: [2*deviceWidth, 3*deviceWidth],
                                            outputRange: [1.0, 0.0]
                                        }),}}
                                    resizeMode="cover"
                    />
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});