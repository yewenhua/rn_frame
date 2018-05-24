import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    InteractionManager
} from 'react-native'

// 获取屏幕宽高
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class ImageLazy extends Component {
    constructor(props) {
        super(props);
        // 先给图片一个默认宽高
        this.state = {
            width: props.w ? props.w : screenWidth,
            height: props.h ? props.h : screenWidth,
            loaded: false
        }
        this._onLayout = this._onLayout.bind(this)
    }
    // 2、获取组件初始化位置
    _onLayout(e, node) {
        let {y} = e.nativeEvent.layout
        //alert(y)
        this.setState({
            offsetY: y
        })
    }
    // 获取加载中、加载失败视图的函数
    _renderLoad(text) {
        return(
            <View
                style = {[styles.loadContainer, {height: this.state.height}]}
                onLayout = {this._onLayout}
            >
                <Text
                    style = {styles.loadText}
                >{text}</Text>
            </View>
        )
    }

    // 从网络请求图片的方法
    _fetchImg() {
        //InteractionManager 延迟执行任务，该不会影响到正在执行的动画效果
        InteractionManager.runAfterInteractions(() => {
            //耗时较长的同步的任务...
            const {source, style} = this.props
            if(source.uri) {
                // 如果是网络图片 在页面还未加载前，获取图片宽高
                Image.getSize(source.uri, (w, h) => {
                    let imgHeight = (h/w)*this.state.width;
                    this.setState({
                        height: imgHeight,
                        loaded: true
                    })
                }, (err) => {
                    // 获取图片宽高或者下载图片失败
                    this.setState({
                        loadFail: true
                    })
                })
            }
        })
    }

    render() {
        const {source, y} = this.props
        // 3、判断是否可以加载图片了
        if(y + screenHeight >= this.state.offsetY && !this.state.loaded) {
            // 请求图片
            this._fetchImg()
        }
        // 4、如果加载了远程图片，就会渲染这里
        if(this.state.loaded) {
            // 如果真正的图片加载好
            return <Image
                source = {source}
                style = {{height: this.state.height}}
                resizeMode = {'contain'}
            />
        }
        // 1、会先显示加载中视图
        return this._renderLoad('正在加载中...')
    }
}

const styles = StyleSheet.create({
    // 加载容器样式
    loadContainer: {
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    // 加载样式
    loadText: {
        fontSize: 18,
        color: '#ccc'
    }
});