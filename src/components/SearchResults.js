import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';
import Utils from './Utils';
import ImageLazy from './common/ImageLazy'

var cols = 2;
var marginCell = 8;
var cellWH = (Utils.size.width - (cols + 1) * marginCell)/cols;

export default class SearchResults extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params ? navigation.state.params.headerTitle : '搜索结果',
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

    constructor(props){
        super(props);
        this.handleBack = this._handleBack.bind(this);
        let ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataList: ds.cloneWithRows(this.props.navigation.state.params.results),
            y: 0,
            topLoading: false,
        }
        this._onScroll = this._onScroll.bind(this);
    }

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'搜索结果'
        });
    }

    // 滑动触发
    _onScroll(e) {
        // 获取滑动的距离
        let {y} = e.nativeEvent.contentOffset;
        this.setState({
            y
        });
    }

    _handleBack() {
        this.props.navigation.goBack();
    }

    _onRefresh(){
        this.setState({
            topLoading: true
        });

        setTimeout(function(){
            this.setState({
                topLoading: false
            });
        }.bind(this), 3000);
    }

    _renderRow(data){
        return (
            <TouchableOpacity style={styles.cellBox} onPress={()=>{this.props.navigation.navigate('GoodsDetail', { id: 1 });}}>
                <View style={styles.cellBoxView}>
                    <ImageLazy
                        source = {{uri: data.img}}
                        y = {this.state.y}
                        w = {cellWH}
                        h = {cellWH}
                    />
                    <View style={styles.description}>
                        <Text style={[styles.desc, {marginTop: 6}]} numberOfLines={1}>{data.title}</Text>
                        <Text style={styles.desc}>{data.sub_title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    onScroll = {this._onScroll}
                    refreshControl={
                        <RefreshControl
                            onRefresh={this._onRefresh.bind(this)}
                            refreshing={this.state.topLoading}
                            colors={['red','#ffd500','#0080ff','#99e600']}
                            tintColor={'red'}
                        />
                    }
                >
                    <ListView
                        dataSource={this.state.dataList}
                        renderRow={this._renderRow.bind(this)}
                        contentContainerStyle={styles.nineCell}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    nineCell: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F5F5F5',
        width: Utils.size.width,
        marginTop: marginCell
    },
    cellBox: {
        width: cellWH,
        height: cellWH + 50,
        backgroundColor: '#f4f4f4',
        marginLeft: marginCell,
        marginBottom: marginCell,
        borderWidth: Utils.pixel,
        borderColor: "#ccc",
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {height: 2, width: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    cellBoxView: {
        width: cellWH,
        height: cellWH + 50,
    },
    description: {
        width: cellWH,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingBottom: 5
    },
    desc: {
        paddingLeft: 5,
        color: 'white'
    },
});

