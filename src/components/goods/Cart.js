
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { SwipeAction } from 'antd-mobile';
import Utils from '../Utils';

const itemHeight = 100;
const imgHeight = 90;

export default class Cart extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params?navigation.state.params.headerTitle:'购物车',
        headerRight:(
            <Text style={{color:'white',marginRight:20}} onPress={()=>navigation.state.params?navigation.state.params.navigatePress():null}>更多</Text>
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
            list: [
                {id:1, name: '花王纸尿裤', desc: '', price: 99, num: 1, checked: false},
                {id:2, name: '花王纸尿裤', desc: '', price: 99, num: 1, checked: false},
                {id:3, name: '花王纸尿裤', desc: '', price: 99, num: 1, checked: false},
                {id:3, name: '花王纸尿裤', desc: '', price: 99, num: 1, checked: false},
                {id:3, name: '花王纸尿裤', desc: '', price: 99, num: 1, checked: false},
                {id:3, name: '花王纸尿裤', desc: '', price: 99, num: 1, checked: false},
                {id:5, name: '花王纸尿裤', desc: '', price: 99, num: 1, checked: false}
            ],
        };
    }

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'购物车',
            navigatePress:this.navigatePress,
        });
    }

    navigatePress = () => {
        alert('点击headerRight');
    }

    cartlist(){
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{width: Utils.size.width, height: Utils.size.height - 50}}>
                    {this.state.list.map((item, index)=>{
                        return(
                            <SwipeAction
                                key={index}
                                style={{backgroundColor: 'gray',borderBottomWidth: hairline,borderBottomColor: '#ccc'}}
                                autoClose
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => {
                                            alert('OK')
                                        },
                                        style: {backgroundColor: '#F4333C', color: 'white'},
                                    },
                                ]}
                                onOpen={() => {}}
                                onClose={() => {}}
                            >
                                <View style={styles.item}>
                                    <View style={styles.select}>
                                        <CheckBox onClick={()=>{}} isChecked={item.checked}/>
                                    </View>
                                    <View style={styles.img}>
                                        <Image style={styles.imgDetail} source = {require('../../img/sphere.jpg')}></Image>
                                    </View>
                                    <View style={styles.detail}>
                                        <Text style={styles.title} numberOfLines={2}>武夷山大红袍武夷山大红袍武夷山大红袍</Text>
                                        <Text style={styles.price}>499</Text>
                                        <View style={styles.operate}>
                                            <TouchableOpacity>
                                                <View style={styles.btn}>
                                                    <Text style={styles.txt}>-</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={styles.num}>
                                                <Text style={styles.txt}>10</Text>
                                            </View>
                                            <TouchableOpacity>
                                                <View style={styles.btn}>
                                                    <Text style={styles.txt}>+</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </SwipeAction>
                        )
                    })}
                </ScrollView>
                <View style={styles.clear}>
                    <View style={styles.all}>
                        <CheckBox onClick={()=>{}} isChecked={false} checkBoxColor="red" rightTextStyle={{color: "#f60"}} rightText="全选"/>
                    </View>
                    <View style={styles.count}>
                        <Text style={styles.money}>29999元</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.submit}>
                            <Text style={styles.submitTxt}>结算</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.cartlist()}
            </View>
        );
    }
}

const hairline = StyleSheet.hairlineWidth;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: itemHeight,
    },
    select: {
        width: 40,
        height: itemHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    img: {
        width: itemHeight,
        height: itemHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgDetail:{
        height: imgHeight,
        width: imgHeight,
        borderRadius: 2
    },
    detail: {
        flex: 1,
        flexDirection: 'column',
        height: itemHeight,
        backgroundColor: '#FFFFFF',
        paddingVertical: 5,
        paddingHorizontal: 6
    },
    title:{
        color: "#333",
        fontSize: 16
    },
    price:{
        color: "red",
        fontSize: 16
    },
    operate:{
        height: 22,
        width: 99,
        borderRadius: 2,
        borderWidth: hairline,
        borderColor: "#ccc",
        flexDirection: 'row',
        marginTop: 5
    },
    btn:{
        height: 22,
        width: 33,
        borderRightWidth: hairline,
        borderRightColor: "#ccc",
        justifyContent: 'center',
        alignItems: 'center',
    },
    num:{
        height: 22,
        width: 33,
        borderRightWidth: hairline,
        borderRightColor: "#ccc",
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt:{
        color: "#333"
    },
    clear:{
        flexDirection: "row",
        height: 50,
        width: Utils.size.width,
        backgroundColor: '#FFFFFF',
        borderTopWidth: hairline,
        borderTopColor: "#ccc",
        zIndex: 9999
    },
    all:{
        width: 130,
        height: 50,
        justifyContent: 'center',
        marginLeft: 8
    },
    count:{
        width: Utils.size.width - 270,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10
    },
    submit:{
        width: 140,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    money:{
        color: '#f60',
        fontSize: 20,
    },
    submitTxt:{
        color: '#ffffff',
        fontSize: 20
    },
});

