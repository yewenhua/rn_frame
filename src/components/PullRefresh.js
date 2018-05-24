'use strict'

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    PanResponder,
    LayoutAnimation,
    ProgressBarAndroid,
    Dimensions,
    Text,
    AsyncStorage,
    Image
} from 'react-native';

let self;
/**ref的引用*/
const PULL_REFRESH_LAYOUT="pullLayout";
/**屏幕宽度*/
const deviceWidth = Dimensions.get('window').width;
/**下拉阻力系数*/
const factor=1.8;
/**最大下拉高度*/
const MAX_PULL_LENGTH=170;
/**Loading的高度*/
const REFRESH_PULL_LENGTH=70;
/**动画时长*/
const BACK_TIME=400;
/**存储最后刷新时间的Key*/
const REFRESH_LAST_TIME_KEY="refresh_last";

const RefreshStatus={
    Refresh_NONE:0,
    Refresh_Drag_Down:1,
    Refresh_Loading:2,
    Refresh_Reset:3,
};

const ShowLoadingStatus={
    SHOW_DOWN:0,
    SHOW_UP:1,
    SHOW_LOADING:2,
};

class PullRefresh extends Component{

    _panResponder:{}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentDistance:0,

            pullRefreshStatus:RefreshStatus.Refresh_NONE,

            showPullStatus:ShowLoadingStatus.SHOW_DOWN,

            showPullLastTime:'NONE',
        };
        this.resetHeader=this.resetHeader.bind(this);
        this.refreshStateHeader=this.refreshStateHeader.bind(this);
        this.getTime=this.getTime.bind(this);
        this.addZeroAtFront=this.addZeroAtFront.bind(this);
    }

    /*
     * 要求成为响应者
     * 用户开始触摸屏幕的时候，是否愿意成为响应者
     */
    _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        return true;
    }

    /*
     * 在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互
     */
    _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        return true;
    }

    /*
     * touch down 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
     */
    _handlePanResponderGrant(e: Object, gestureState: Object){

    }

    /*
     * touch move 响应滑动事件
     */
    _handlePanResponderMove(e: Object, gestureState: Object) {
        //下拉图标显示方式确定
        if(self.state.currentDistance>REFRESH_PULL_LENGTH){
            if(self.state.showPullStatus===ShowLoadingStatus.SHOW_DOWN){
                self.setState({
                    showPullStatus:ShowLoadingStatus.SHOW_UP,
                });
            }
        }
        else{
            if (self.state.showPullStatus===ShowLoadingStatus.SHOW_UP){
                self.setState({
                    showPullStatus:ShowLoadingStatus.SHOW_DOWN,
                });
            }
        }

        if (self.state.pullRefreshStatus===RefreshStatus.Refresh_Loading){
            self.setState({
                currentDistance:REFRESH_PULL_LENGTH+gestureState.dy/factor,
                // refreshStateHeader:2,
            });

            //用setNativeProps来直接改变值,如果用state状态机来动态更改,会造成 View的多次重复render,造成不必要的性能损耗
            self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
                style:{
                    marginTop:self.state.currentDistance,
                }
            });
            return;
        }

        //下拉距离计算，下拉状态确定
        if (gestureState.dy>0&&self.state.currentDistance<MAX_PULL_LENGTH){
            self.setState({
                currentDistance:gestureState.dy/factor,
                pullRefreshStatus:RefreshStatus.Refresh_Drag_Down,
            });

            //用setNativeProps来直接改变值,如果用state状态机来动态更改,会造成 View的多次重复render,造成不必要的性能损耗
            self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
                style:{
                    marginTop:self.state.currentDistance,
                }
            });
        }
        else if(gestureState.dy>0&&self.state.currentDistance>MAX_PULL_LENGTH){//则不再往下移动
            self.setState({
                currentDistance:MAX_PULL_LENGTH,
                pullRefreshStatus:RefreshStatus.Refresh_Drag_Down,
            });

            //用setNativeProps来直接改变值,如果用state状态机来动态更改,会造成 View的多次重复render,造成不必要的性能损耗
            self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
                style:{
                    marginTop:self.state.currentDistance,
                }
            });
        }
    }

    /*
     * 用户放开了所有的触摸点
     */
    _handlePanResponderEnd(e: Object, gestureState: Object) {
        if (self.state.currentDistance >= REFRESH_PULL_LENGTH){
            self.refreshStateHeader();
        }
        else{
            self.resetHeader();
        }
    }


    resetHeader(){
        /*
         * 要实现动画效果只需要在setState()前添加LayoutAnimation动画方法
         * 当布局变化时，自动将视图运动到它们新的位置上
         */
        LayoutAnimation.configureNext({
            duration: BACK_TIME,
            update: {
                type: 'linear',
            }
        });

        //用setNativeProps来直接改变值,如果用state状态机来动态更改,会造成 View的多次重复render,造成不必要的性能损耗
        self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
            style:{
                marginTop:0,
            }
        });

        self.setState({
            currentDistance:0,
            pullRefreshStatus:RefreshStatus.Refresh_Reset,
            showPullStatus:ShowLoadingStatus.SHOW_DOWN,
        });
    }

    refreshStateHeader(){
        self.setState({
            pullRefreshStatus:RefreshStatus.Refresh_Loading,
            currentDistance:REFRESH_PULL_LENGTH,
            showPullStatus:ShowLoadingStatus.SHOW_LOADING,
        },()=>{
            if(self.props.onRefresh){
                self.props.onRefresh(()=>{
                    setTimeout(()=>{
                        this.stopRefresh();
                    }, 2000)
                });
            }
        });

        /*
         * 要实现动画效果只需要在setState()前添加LayoutAnimation动画方法
         * 当布局变化时，自动将视图运动到它们新的位置上
         * 将 正在刷新的布局恢复原状
         */
        LayoutAnimation.configureNext({
            duration: BACK_TIME,
            update: {
                type: 'linear',
            }
        });

        //用setNativeProps来直接改变值,如果用state状态机来动态更改,会造成 View的多次重复render,造成不必要的性能损耗
        self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
            style:{
                marginTop:REFRESH_PULL_LENGTH,
            }
        });
    }

    addZeroAtFront(count){
        if (count<10){
            count="0"+count;
        }
        return count;
    }

    getTime(){
        let date=new Date();

        let mMonth=this.addZeroAtFront(date.getMonth()+1);

        let mDate=this.addZeroAtFront(date.getDate());

        let mHours=this.addZeroAtFront(date.getHours());

        let mMinutes=this.addZeroAtFront(date.getMinutes());

        return mMonth+"-"+mDate+"  "+mHours+":"+mMinutes;
    }

    stopRefresh(){
        let savedDate=this.getTime();
        self.setState({
            showPullLastTime:savedDate,
        });
        AsyncStorage.setItem(REFRESH_LAST_TIME_KEY,savedDate,()=>{

        });
        this.resetHeader();
    }

    componentDidMount() {
        AsyncStorage.getItem(REFRESH_LAST_TIME_KEY,(err,result)=>{
            if (result){
                self.setState({
                    showPullLastTime:result,
                });
            }
        });
    }

    componentWillMount() {
        self=this;
        this._panResponder=PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
    }

    /*
     * 阻止接下来的render()函数的调用，阻止组件重渲染，而返回true时，组件照常重渲染
     * 用来比较哪些状态的更改需要重新render,用当前的state与将要改变的state比较是否一致
     */
    shouldComponentUpdate(nextProps,nextState) {
        if (nextState.showPullStatus!==self.state.showPullStatus){
            return true;
        }
        if (self.state.showPullLastTime!==nextState.showPullLastTime){
            return true;
        }
        return false;
    }

    render(){
        let pullText;
        let indicatorView;
        if (this.state.showPullStatus===ShowLoadingStatus.SHOW_DOWN){
            indicatorView=<Image
                style={{height:30,width:30,marginRight:10}}
                source={require('../img/voice_fill.png')}
                resizeMode={Image.resizeMode.contain}
            />;
            pullText="下拉刷新";
        }
        else if (this.state.showPullStatus===ShowLoadingStatus.SHOW_UP){
            indicatorView=<Image
                style={{height:30,width:30,marginRight:10,transform:[{rotate:"180deg"}]}}
                source={require('../img/voice_fill.png')}
                resizeMode={Image.resizeMode.contain}
            />;
            pullText="释放刷新";
        }
        else if(this.state.showPullStatus===ShowLoadingStatus.SHOW_LOADING){
            indicatorView=<ProgressBarAndroid style={{marginRight:10,width:30,height:30}} />
            pullText="刷新中......";
        }

        return (
            <View style={styles.base}>
                <View style={{flex: 1, backgroundColor:'white',position:'absolute',}}>
                    <View style={{justifyContent:'center',alignItems:'center',width:deviceWidth,height:REFRESH_PULL_LENGTH,flexDirection:'row'}}>
                        {indicatorView}
                        <View style={{height:REFRESH_PULL_LENGTH,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                            <Text style={{fontSize:12,color:'#666',marginBottom:1}}>{pullText}</Text>
                            <Text style={{fontSize:12,color:'#666',marginTop:1}}>最后更新:   {this.state.showPullLastTime}</Text>
                        </View>
                    </View>
                </View>
                <View
                    ref={PULL_REFRESH_LAYOUT}
                    style={{flex:1,position:'absolute'}}  {...this._panResponder.panHandlers} >
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export default PullRefresh;

var styles = StyleSheet.create({
    base: {
        flex: 1
    },
});