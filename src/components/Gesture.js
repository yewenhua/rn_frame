import React, {Component} from 'react';
import {
    PanResponder,
    StyleSheet,
    View
} from 'react-native';

export default class Gesture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            top:0,
            left:0,
        };
    }

    componentDidMount() {}

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: ()=> true,
            onPanResponderGrant: ()=>{
                //表示申请成功，组件成为了事件处理响应者
                this._top = this.state.top
                this._left = this.state.left
                this.setState({bg: 'red'})
            },
            onPanResponderMove: (evt,gs)=>{
                //dx 和 dy：从手势开始时，到当前回调是移动距离
                this.setState({
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })
            },
            onPanResponderRelease: (evt,gs)=>{
                this.setState({
                    bg: 'white',
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })
            },
            onPanResponderTerminate: (evt,gs)=>{
                //这个回调也会发生在系统直接终止组件的事件处理，例如用户在触摸操作过程中，突然来电话的情况
                this.setState({
                    bg: 'white',
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    {...this._panResponder.panHandlers}
                    style={[styles.rect,{
                        "top":this.state.top,
                        "left":this.state.left,
                        "backgroundColor": this.state.bg
                    }]}>

                </View>
            </View>
        );
    }

};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    rect:{
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:50,
        marginTop: 50,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#223344'
    }
});