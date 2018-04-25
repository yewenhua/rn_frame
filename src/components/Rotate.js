import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    Image
} from 'react-native';

export default class Rotate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1),
            rotateValue: new Animated.Value(0) //旋转角度的初始值
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation() {
        this.state.bounceValue.setValue(1);
        this.state.rotateValue.setValue(0);

        //组合动画
        Animated.parallel([
            //动画类型
            Animated.spring(this.state.bounceValue, {
                toValue: 1,  //变化目标值，也没有变化
                friction: 20 //friction 摩擦系数，默认40
            }),
            Animated.timing(this.state.rotateValue, {
                toValue: 1,       //角度从0变1
                duration: 15000,  //从0到1的时间
                easing: Easing.out(Easing.linear) //线性变化，匀速旋转
            }),
            //调用start启动动画,start可以回调一个函数,从而实现动画循环
        ]).start(()=>this.startAnimation());   // 开始执行动画
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.Image source={require('../img/poincare.png')}
                    // 可动画化的视图组件
                    style={{width:150,
                        height: 150,
                        borderRadius:75,
                        transform: [
                            {scale: this.state.bounceValue},

                            //使用interpolate插值函数,实现了从数值单位的映射转换,上面角度从0到1，这里把它变成0-360的变化
                            // 将rotate指定为动画变量值
                            {rotate: this.state.rotateValue.interpolate({
                                inputRange: [0,1],
                                outputRange: ['0deg', '360deg'],
                            })},
                        ]}}>
                </Animated.Image>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});