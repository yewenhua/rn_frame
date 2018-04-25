
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Platform,
    TouchableHighlight
} from 'react-native';

class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

var CustomLayoutAnimation = {
    duration: 800,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
    },
};

export default class Test5 extends Component {
    constructor(props) {
        super(props);
        this.state={
            views:[],
            num:0,
            width: 100,
            height: 100
        }

        // 1、在Android设备上面，需要开启动画设置，iOS设备默认打开
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this._onPress = this._onPress.bind(this);
    }

    static navigationOptions = {
        drawerLabel:'我',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../img/voice.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    componentWillUpdate() {
        //2、当布局需要更新的时候，使用LayoutAnimation进行设置一下动画配置即可,对全局有效，会覆盖局部方法中的设置
        LayoutAnimation.easeInEaseOut();

        //2、或者可以使用如下的自定义的动画效果
        //LayoutAnimation.configureNext(CustomLayoutAnimation);
    }

    _onPressAddView() {
        this.setState({
            num: Number.parseInt(this.state.num) + 1
        });
    }

    _onPressRemoveView() {
        if(Number.parseInt(this.state.num) >= 1) {
            this.setState({
                num: Number.parseInt(this.state.num) - 1
            });
        }
    }

    _renderAddedView(i) {
        return (
            <View key={i} style={styles.view}>
                <Text style={{color:'#fff'}}>{i}</Text>
            </View>
        );
    }

    _skip() {
        this.props.navigation.goBack();
    }

    _onPress() {
        LayoutAnimation.spring();
        this.setState({
            width: Number.parseInt(this.state.width) + 20,
            height: Number.parseInt(this.state.height) + 20
        });
    }

    render() {
        this.state.views.length = 0;
        for(var i=0; i<this.state.num; i++){
            this.state.views.push(this._renderAddedView(i));
        }

        return(
            <View style={{flex:1, padding:15}}>
                <Text onPress={this._skip.bind(this)}>返回上一界面</Text>
                <CustomButton text="添加View"  onPress={this._onPressAddView.bind(this)}/>
                <CustomButton text="删除View"  onPress={this._onPressRemoveView.bind(this)}/>
                <View style={styles.viewContainer}>
                    {this.state.views}
                </View>


                <View style={[styles.box, {width: this.state.width, height: this.state.height}]} />
                <TouchableOpacity onPress={this._onPress}>
                    <View style={styles.button}>
                        <Text>Press me!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin:5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    view: {
        height: 50,
        width: 50,
        backgroundColor: 'green',
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        margin:5,
        backgroundColor: 'red'
    }
});