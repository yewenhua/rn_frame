import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Button,
    Alert
} from 'react-native';
import Utils from './Utils'

var cols = 2;
var marginCell = 6;
var cellWH = (Utils.size.width - (cols + 1) * marginCell)/cols;
var ITEM_HEIGHT = cellWH;

export default class FlatListDemo extends Component {
    constructor(props) {
        super(props);
        var data = [];
        for (var i = 0; i < 10; i++) {
            data.push({key: i, title: i + ''});
        }

        this.state = {
            refreshing: false,
            data: data,
            loading: false
        };
    }

    _flatList;

    _renderItem = (row) => {
        var txt = '第' + row.index + '个' + ' title=' + row.item.title;
        var bgColor = row.index % 2 == 0 ? 'red' : 'blue';
        return <View style={styles.cell}>
            <Text style={[{height:ITEM_HEIGHT,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
        </View>
    }

    _header = () => {
        return <Text style={[styles.txt,{backgroundColor:'black', marginBottom: 6, fontSize: 16, height: 40}]}>这是头部</Text>;
    }

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black', marginTop: 6, fontSize: 16, height: 40}]}>{this.state.loading ? '加载中…' : '这是尾部'}</Text>;
    }

    _separator = () => {
        return <View style={{height:6,backgroundColor:'white'}}/>;
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={{flex:1}}>
                <Button title='滚动到指定位置' onPress={()=>{
                    //this._flatList.scrollToEnd();
                    //this._flatList.scrollToIndex({viewPosition:0,index:8});
                    this._flatList.scrollToOffset({animated: true, offset: 2000});
                }}/>
                <View style={{flex:1}}>
                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        numColumns ={2}

                        //用于避免动态测量内容尺寸的开销
                        getItemLayout={(data,index)=>(
                            //length: 你的item的height, offset: (你的item的height + ItemSeparator的height) * index, index
                            {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT+6) * index, index}
                        )}

                        keyExtractor={this._keyExtractor}
                        refreshing={this.state.refreshing}
                        onRefresh={()=>{
                            this.setState({refreshing: true})//开始刷新
                            setTimeout(function(){
                                Alert.alert('没有可刷新的内容！');
                                this.setState({refreshing: false});//停止刷新
                            }.bind(this), 2000);
                        }}
                        onEndReachedThreshold={0.1}  //此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半
                        onEndReached={(info)=>{
                            this.setState((state) => ({
                                loading: true
                            }));

                            if(!this.state.loading) {
                                setTimeout(() => {
                                    var data = [];
                                    for (var i = 0; i < 10; i++) {
                                        data.push({key: i, title: i + ''});
                                    }

                                    this.setState((state) => ({
                                        data: state.data.concat(data),
                                        loading: false
                                    }));
                                }, 2000)
                            }
                        }}
                        data={this.state.data}>
                    </FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    },
    cell: {
        width: cellWH,
        marginLeft: marginCell
    }
});