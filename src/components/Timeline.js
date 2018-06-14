
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity
} from 'react-native';
import data from './TimelineData.json';
import ImageViewer from 'react-native-image-zoom-viewer';
import Utils from './Utils';

var {width, height} = Utils.size;
var dataAry = []

export default class Timeline extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataAry: dataAry,
            modalVisible: false,
            images: [],
            index: 0
        };
    }

    render() {
        return (
            <View>
                <FlatList
                    data = {this.state.dataAry}
                    renderItem = {(item) => this.renderRow(item)}
                    keyExtractor={this.keyExtractor}
                />
                <View style={{width:1,height:height,backgroundColor:'#ccc',position:'absolute',left:50}}></View>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <ImageViewer onSwipeDown={() => this.setState({ modalVisible: false })} onClick={() => this.setState({ modalVisible: false })} imageUrls={this.state.images} index={this.state.index} />
                </Modal>
            </View>
        );
    }

    renderRow =(item) =>{
        if(item.item.text){
            return(
                <View style={{marginBottom:10,marginLeft:60}}>
                    <Text>{item.item.text}</Text>
                </View>
            )
        }else{
            return(
                <View style={{flexDirection:'row',marginBottom:10}}>
                    {/*左边*/}
                    <View style={{width:60,marginBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>{item.item.time}</Text>
                            <View style={{width:10,height:10,borderRadius:5,backgroundColor:'#ccc',position:'absolute',left:45}}></View>
                        </View>
                    </View>
                    {/*右边*/}
                    <View style={{backgroundColor:"#F2F2F2",marginLeft:5,width:width-70}} onLayout = {(event)=>this.onLayout(event)} >
                        <Text style={{}}>{item.item.content}</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            {this.renderImg(item.item.image)}
                        </View>
                    </View>
                </View>
            )
        }
    }

    keyExtractor(item: Object, index: number) {
        return item.id + 'key';
    }

    onLayout = (event)=>{
        console.log(event.nativeEvent.layout.height)
    }

    renderImg = (imgAry) =>{
        var renderAry = []
        imgAry.map((item, index)=>{
            if(imgAry.length == 1){
                renderAry.push(
                    <TouchableOpacity key={index} onPress={()=>{
                        this.setState({
                            index: index,
                            images: imgAry,
                            modalVisible: true
                        });
                    }}>
                        <Image key={index} source={{uri:imgAry[0].url}} style={{width:200,height:200}}/>
                    </TouchableOpacity>
                )
            }else if(imgAry.length == 2 || imgAry.length == 4){
                renderAry.push(
                    <TouchableOpacity key={index} onPress={()=>{
                        this.setState({
                            index: index,
                            images: imgAry,
                            modalVisible: true
                        });
                    }}>
                        <Image key={index} source={{uri:imgAry[index].url}} style={{width:(width-70)*0.5-2,height:(width-70)*0.5-2,marginLeft:1,marginTop:1}}/>
                    </TouchableOpacity>
                )
            }else {
                renderAry.push(
                    <TouchableOpacity key={index} onPress={()=>{
                        this.setState({
                            index: index,
                            images: imgAry,
                            modalVisible: true
                        });
                    }}>
                        <Image key={index} source={{uri:imgAry[index].url}} style={{width:(width-70)/3-2,height:(width-70)/3-2,marginLeft:1,marginTop:1}}/>
                    </TouchableOpacity>
                )
            }
        });

        return renderAry
    }

    componentDidMount() {
        this.setState({
            dataAry:data
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});