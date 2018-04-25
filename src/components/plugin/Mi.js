'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
    Image
} from 'react-native';
import Test5 from "../Test5";

const hairline = StyleSheet.hairlineWidth;
const {width, height} = Dimensions.get('window');

export default class Mi extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            status: 'on',
            rotateValue: new Animated.Value(0)
        };
    }

    switchStatus(){
        this.state.rotateValue.setValue(0);

        //组合动画
        Animated.sequence([
            Animated.timing(this.state.rotateValue, {
                toValue: 1,       //角度从0变1
                duration: 600,  //从0到1的时间
                easing: Easing.out(Easing.linear) //线性变化，匀速旋转
            }),
            Animated.timing(this.state.rotateValue, {
                toValue: 0,       //角度从0变1
                duration: 600,  //从0到1的时间
                easing: Easing.out(Easing.linear) //线性变化，匀速旋转
            })
        ]).start();


        var newStatus = this.state.status == 'on' ? 'off' : 'on';
        this.setState({
            status: newStatus
        });
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.lockWrapper}>
                <View style={styles.lockVertical}>

                </View>
                <View style={styles.lockHorizontal}>
                    <Animated.View style={[styles.lockHand, {transform: [
                        //使用interpolate插值函数,实现了从数值单位的映射转换,上面角度从0到1，这里把它变成0-360的变化
                        // 将rotate指定为动画变量值
                        {rotate: this.state.rotateValue.interpolate({
                            inputRange: [0,1],
                            outputRange: ['0deg', '-45deg'],
                        })},
                    ]}]}>
                        <View style={styles.lockRotate}></View>
                    </Animated.View>

                </View>
                <View style={styles.lockCenter} >
                    <TouchableOpacity onPress={this.switchStatus.bind(this)}>
                        <View style={styles.lockClick}>
                            <Text style={styles.lockText}>{this.state.status == 'on' ? '开' : '关'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    lockWrapper: {
        width: width,
        height: 500
    },
    lockVertical: {
        height: 400,
        width: 100,
        borderWidth: 1,
        borderColor: 'yellow',
        position: 'absolute',
        left: width/2,
        top: 250,
        marginLeft: -50,
        marginTop: -200
    },
    lockVerticalImg: {
        height: 500,
        width: 50
    },
    lockHorizontal: {
        height: 200,
        width: 4 * width/5,
        position: 'absolute',
        left: width/2,
        top: 250,
        marginLeft: -2 * width/5,
        marginTop: -100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lockHorizontalImg: {

    },
    lockCenter: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'blue',
        position: 'absolute',
        left: width/2,
        top: 250,
        marginLeft: -20,
        marginTop: -20
    },
    lockClick: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lockText: {
        color: 'white'
    },
    lockHand: {
        height: 50,
        width: 4 * width/5
    },
    lockRotate:{
        height: 50,
        width: 2 * width/5 + 40,
        borderWidth: 1,
        borderColor: 'green'
    }
});

