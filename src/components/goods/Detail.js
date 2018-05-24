
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import { Carousel } from 'antd-mobile';
import Utils from '../Utils';

export default class Detail extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params?navigation.state.params.headerTitle:'商品详情',
        headerRight:(
            <Text style={{color:'red',marginRight:20}} onPress={()=>navigation.state.params?navigation.state.params.navigatePress():null}>更多</Text>
        ),
        headerStyle:{
            backgroundColor:'#4ECBFC',
            height: 48
        },
        headerTitleStyle:{
            fontSize:20,
            color:'white',
            alignSelf:'center'
        },
        // 设置滑动返回的距离
        gestureResponseDistance:{horizontal:300},

    });

    constructor(props) {
        super(props);
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            initialHeight: 180,
            number: 0,
            heightValue: new Animated.Value(0),   //Y轴距离
            widthValue: new Animated.Value(0),    //X轴距离
            springValue: new Animated.Value(0),   //购物车数量字符的变大变小效果

            modal: false,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
        };
    }

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'商品详情',
            navigatePress:this.navigatePress,
        });
    }

    navigatePress = () => {
        alert('点击headerRight');
    }

    startAnimated() {
        this.state.heightValue.setValue(0);
        this.state.widthValue.setValue(0);

        this.setState({
            number: this.state.number + 1
        });

        Animated.parallel([
            Animated.timing(this.state.heightValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,// 线性的渐变函数
            }),
            Animated.timing(this.state.widthValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,// 线性的渐变函数
            }),
        ]).start(() => this.spring());
    }

    spring() {
        this.state.springValue.setValue(0);
        Animated.spring(
            this.state.springValue,
            {
                toValue: 1,
                firction: 1
            }).start();
    }

    show() {
        if(this.state.modal){
            return false;
        }

        this.state.opacity.setValue(0);
        this.state.offset.setValue(0);
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 100,
                    toValue: 0.8,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 100,
                    toValue: 1,
                }
            )
        ]).start(()=>{
            this.setState({
                modal: true
            });
        });
    }

    close(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 100,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 100,
                    toValue: 0,
                }
            )
        ]).start(()=>{
            this.setState({
                modal: false
            });
        });
    }

    mask(){
        const opacity = this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        return this.state.modal ? (
            <Animated.View style={ [styles.mask, {opacity}] }>
                <TouchableOpacity onPress={this.close.bind(this)}>
                    <View style={styles.maskContent}/>
                </TouchableOpacity>
            </Animated.View>
        ) : null;
    }

    modal(){
        return this.state.modal ? (
            <Animated.View style={[styles.modal , {
                bottom: this.state.offset.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-modalHeight, 0]
                })
            }]}>
                <View style={ styles.size }>
                    <TouchableOpacity onPress={() => {
                        this.close();
                    }}>
                        <Text>点击关闭</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        ) : null;
    }

    render() {
        const aheight = this.state.heightValue.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [25, 75, 100, 75, 25]
        });
        const awidth = this.state.widthValue.interpolate({
            inputRange: [0, 1],
            outputRange: [(3 * Utils.size.width - 190)/4, (Utils.size.width -35)]
        });
        const springBig = this.state.springValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.5, 1]
        });

        const hProp = this.state.initialHeight ? { width: Utils.size.width, height: this.state.initialHeight } : {width: Utils.size.width};
        return (
            <View style={styles.container}>
                <Carousel
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(ii => (
                        <View key={ii} style={hProp}>
                            <Image style={hProp} source={{uri: 'https://zos.alipayobjects.com/rmsportal/'+ii+'.png'}}/>
                        </View>
                    ))}
                </Carousel>
                <View style={styles.info}>
                    <View style={styles.title}>
                        <Text style={styles.titleTxt}>武夷山大红袍，买三赠一</Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.priceTxt}>¥ 99</Text>
                    </View>
                    <View style={styles.number}>
                        <View style={styles.total}>
                            <Text style={styles.numberTxt}>库存：800</Text>
                        </View>
                        <View style={styles.sale}>
                            <Text style={styles.numberTxt}>销量：100</Text>
                        </View>
                        <View style={styles.logistic}>
                            <Text style={styles.numberTxt}>运费：100</Text>
                        </View>
                    </View>
                </View>

                {this.mask()}
                {this.modal()}

                <Animated.Image
                    source={require('../../img/logo.png')}
                    style={{width: 20, height: 20, position: 'absolute', bottom: aheight, right: awidth}}/>
                <View style={styles.operate}>
                    <TouchableOpacity>
                        <View style={styles.cart}>
                            <Text style={styles.opeColor}>购物车</Text>
                            <Animated.View style={[styles.numberView,
                                {
                                    transform: [{
                                        scale: springBig
                                    }]
                                }]
                            }>
                                <Text style={[styles.numberText, {color: 'red'}]}>{this.state.number}</Text>
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.startAnimated();
                    }}>
                        <View style={styles.add}>
                            <Text style={styles.opeColor}>加入购物车</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.show();
                    }}>
                        <View style={styles.buy}>
                            <Text style={styles.opeColor}>立刻购买</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const modalHeight = 300;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    operate:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 50,
        width: Utils.size.width,
        flexDirection: 'row'
    },
    cart:{
        height: 50,
        width: 50,
        backgroundColor: 'green',
        justifyContent:'center',
        alignItems: 'center'
    },
    add:{
        height: 50,
        width: Utils.size.width/2 -25,
        backgroundColor: '#f85',
        justifyContent:'center',
        alignItems: 'center'
    },
    opeColor:{
        color: 'white'
    },
    buy:{
        height: 50,
        width: Utils.size.width/2 - 25,
        backgroundColor: '#dd2727',
        justifyContent:'center',
        alignItems: 'center'
    },
    info:{
        paddingTop: 15
    },
    title:{
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    titleTxt:{
        fontSize: 16,
    },
    price:{
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    priceTxt:{
        color: 'red',
        fontSize: 14,
    },
    number:{
        height: 45,
        width: Utils.size.width,
        flexDirection: 'row',
        borderTopColor: "#e9e9e9",
        borderTopWidth: 1,
        borderBottomColor: "#e9e9e9",
        borderBottomWidth: 1,
        paddingTop: 3,
        paddingBottom: 3,
    },
    numberTxt:{
        fontSize: 14,
        color: "#666666"
    },
    total:{
        width: Utils.size.width/3,
        justifyContent:'center',
        alignItems: 'center',
        borderRightColor: "#e9e9e9",
        borderRightWidth: 1,
    },
    sale:{
        width: Utils.size.width/3,
        justifyContent:'center',
        alignItems: 'center',
        borderRightColor: "#e9e9e9",
        borderRightWidth: 1,
    },
    logistic:{
        width: Utils.size.width/3,
        justifyContent:'center',
        alignItems: 'center',
    },
    numberView: {
        position: 'absolute',
        right: 5,
        top: 2,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'red',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal:{
        backgroundColor: '#ffffff',
        width: Utils.size.width,
        height: modalHeight,
        position: 'absolute',
        bottom: -modalHeight,
        left: 0
    },
    size:{
        width: Utils.size.width,
        height: modalHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor:"rgba(0,0,0,0.6)",
        width:Utils.size.width,
        height:Utils.size.height,
    },
    maskContent: {
        width:Utils.size.width,
        height:Utils.size.height
    },
});

