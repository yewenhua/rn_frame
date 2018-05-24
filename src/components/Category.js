'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    FlatList,
    SectionList
} from 'react-native';
import { SearchBar, Toast } from 'antd-mobile';
import Utils from './Utils';

const {width, height} = Dimensions.get('window');
const CateData = require('./CateData.json');
const navBarHeight = 46;  //顶部搜索框高度
const navItemHeight = 45; //导航栏每一项高度

export default class Category extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params ? navigation.state.params.headerTitle : '类别',
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
        this._flatList = null;
        this._sectionList = null;
        this.state = {
            selectedRootCate: 0,
            listOffsetTop: [],
            query: ''
        };
    }

    listOffset(){
        let listOffsetTop = [];
        CateData.list.forEach((item, index)=>{
            if(index == 0){
                listOffsetTop[index] = 0;
            }
            else{
                var length = CateData.list[index-1].items.length;
                var num = Math.ceil(length/3);
                var height = 28 + num * (110 + 8);
                listOffsetTop[index] = height + listOffsetTop[index-1];
            }
        });

        this.setState({
            listOffsetTop: listOffsetTop
        });
    }

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'类别'
        });

        this.listOffset();
    }

    renderNavBar() {
        return (
            <View style={styles.nav}>
                <SearchBar placeholder="搜索" value={this.state.query} onChange={(query) => {
                    this.setState({
                        query
                    });
                }} onSubmit={this._fetchData.bind(this)} maxLength={20} />
            </View>
        )
    }

    _fetchData(){

        const url = `https://movie.douban.com/j/subject_suggest?q=${this.state.query}`;
        Utils.get(url, function(res){
            this.props.navigation.navigate('SearchResults', { results: res });
        }.bind(this));
    }

    renderCategory() {
        return (
            <View style={styles.cate}>
                {this.renderLeftCate()}
                {this.renderRightContent()}
            </View>
        )
    }

    renderLeftCate() {
        let data = [];
        CateData.nav.forEach((item, index) => {
            data.push({key: index, title: item.text, id: item.id})
        });

        return (
            <View style={{backgroundColor: '#F5F5F5'}}>
                <FlatList
                    ref={flatList => this._flatList = flatList}
                    data={data}
                    ListHeaderComponent={() => (<View/>)}
                    ListFooterComponent={() => (<View/>)}
                    ItemSeparatorComponent={() => <View style={{height:hairline, backgroundColor:'#F5F5F5'}}/>}
                    renderItem={this._leftCateItem}
                    onEndReachedThreshold={20}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={(data, index)=> ( {length: navItemHeight, offset: navItemHeight * index, index} )}
                >
                </FlatList>
            </View>
        )
    }

    renderRightContent() {
        let tempArr = CateData.list.map((item, index) => {
            let tempObj = {}
            tempObj.key = item.text;
            //tempObj.data = item.items;
            tempObj.data = [{detail: item.items}];  //修改数据类型，一个section就是一条数据，该条数据包括多规格数据，数组只有一维
            tempObj.sectionId = index;
            return tempObj;
        });

        return (
            <View style={styles.rightContent}>
                <SectionList
                    ref={(ref) => this._sectionList = ref}
                    renderSectionHeader={this._sectionHeader}
                    renderItem={(data) => this._rightItem(data)}
                    sections={tempArr}
                    stickySectionHeadersEnabled={true}
                    ItemSeparatorComponent={() => <View/>}    //行与行之间的分隔线组件
                    ListHeaderComponent={() => <View/>}       //头部组件
                    ListFooterComponent={() => <View/>}       //尾部组件
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => 'key' + index + item}
                    onMomentumScrollEnd={(e)=>{
                        //监听滚动事件
                        this.state.listOffsetTop.forEach((item, index) => {
                            if (Math.abs(Math.round(e.nativeEvent.contentOffset.y)) >= item) {
                                this.setState({
                                    selectedRootCate: index
                                });

                                var itemToBottomHeight = (CateData.nav.length - index) * navItemHeight;
                                var headerHeight = 48;
                                var contentHeight = height - navBarHeight - headerHeight;
                                var offset = index * navItemHeight;
                                if(itemToBottomHeight > contentHeight){
                                    this._flatList.scrollToOffset({
                                        animated: true,
                                        offset: offset
                                    });
                                }
                                else{
                                    this._flatList.scrollToEnd({animated: true});
                                }
                            }
                        })
                    }}
                    getItemLayout={(tempArr, index) => {
                        //index是某元素在SectionList所有元素中的索引下标，这里所有元素包括：包括sectionHeader，sectionFooter，item

                        var ITEM_HEIGHT = 0;
                        var OFFSET_FROM_TOP = 0;
                        var SECTION_HEADER = 28;
                        var idx = Math.floor(index/3);

                        if(index%3 == 0){
                            //该元素为sectionHeader
                            ITEM_HEIGHT = SECTION_HEADER;

                            if(idx == 0){
                                OFFSET_FROM_TOP = 0;
                            }
                            else{
                                for(let i=0; i<idx; i++){
                                    //一个循环代表一个section
                                    let j = Math.ceil(tempArr[i].data[0].detail.length/3);
                                    OFFSET_FROM_TOP += j * (110 + 8) + SECTION_HEADER;
                                }
                            }
                        }else if(index%3 == 1){
                            //该元素为item
                            let m = Math.ceil(tempArr[idx].data[0].detail.length/3);
                            ITEM_HEIGHT = m * (110 + 8);

                            if(idx == 0){
                                OFFSET_FROM_TOP = SECTION_HEADER;
                            }
                            else{
                                for(let i=0; i<idx; i++){
                                    //一个循环代表一个section
                                    let j = Math.ceil(tempArr[i].data[0].detail.length/3);
                                    OFFSET_FROM_TOP += j * (110 + 8) + SECTION_HEADER;
                                }
                            }
                        }
                        else if(index%3 == 2){
                            //该元素为sectionFooter
                            ITEM_HEIGHT = 0;

                            if(idx == 0){
                                let m = Math.ceil(tempArr[idx].data[0].detail.length/3);
                                OFFSET_FROM_TOP = m * (110 + 8) + SECTION_HEADER;
                            }
                            else{
                                for(let i=0; i<idx; i++){
                                    //一个循环代表一个section
                                    let j = Math.ceil(tempArr[i].data[0].detail.length/3);
                                    OFFSET_FROM_TOP += j * (110 + 8) + SECTION_HEADER;
                                }
                            }
                        }

                        /*
                         * index: 该元素索引位置信息，
                         * offset: 该元素距离列表顶部的距离，
                         * length: 该元素自身的高度
                         */
                        return {
                            index,
                            offset: OFFSET_FROM_TOP,
                            length: ITEM_HEIGHT
                        }
                    }}
                />
            </View>
        )
    }

    _sectionHeader(item) {
        return (
            <View style={{backgroundColor: '#F5F5F5', height: 28, justifyContent: 'center'}}>
                <Text style={{color: 'gray'}}>{item.section.key}</Text>
            </View>
        )
    }

    _leftCateItem = item => {
        let index = item.index;
        let title = item.item.title;

        return (
            <TouchableOpacity
                key={index}
                style={[styles.leftCateItem, this.state.selectedRootCate === index ? styles.leftCateItemActive : styles.leftCateItemInactive]}
                onPress={() => {
                    var itemToBottomHeight = (CateData.nav.length - index) * navItemHeight;
                    var headerHeight = 48;
                    var contentHeight = height - navBarHeight - headerHeight;
                    var offset = index * navItemHeight;
                    if(itemToBottomHeight > contentHeight){
                        this._flatList.scrollToOffset({
                            animated: true,
                            offset: offset
                        });
                    }
                    else{
                        this._flatList.scrollToEnd({animated: true});
                    }

                    this._sectionList.scrollToLocation({animated: true, itemIndex: 0, sectionIndex: index, viewOffset: 0});
                    this.setState({selectedRootCate: index});
                }}
            >
                <Text style={[styles.leftCateItemWord, this.state.selectedRootCate === index ? styles.leftCateItemWordActive : {}]}>{title}</Text>
            </TouchableOpacity>
        )
    }

    _rightItem = (item)=>{
        let sectionIndex = item.section.sectionId;
        let data = item.item.detail;
        return (
            <View key={item.index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
               {data.map((cell, index) => this._rightCell(cell, sectionIndex, index))}
            </View>
        )
    }

    _rightCell(item, sectionIndex, index) {
        return (
            <TouchableOpacity
                key={index}
                style={styles.rightCell}
                onPress={() => alert(`点击了第${sectionIndex + 1}组中的第${index + 1}个商品`)}
            >
                <Image style={styles.rightCellImg} source={{uri: item.img}}/>
                <Text style={styles.rightCellTxt} numberOfLines={1} >{item.text}</Text>
                <Text style={styles.rightCellTxt} numberOfLines={1} >{item.text}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return <View style={styles.container}>
            {this.renderNavBar()}
            {this.renderCategory()}
        </View>;
    }
}

const hairline = StyleSheet.hairlineWidth;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    nav: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1
    },
    cate: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    leftNav:{
        backgroundColor: '#ff0000',
        width: 100
    },
    rightContent:{
        backgroundColor: '#F5F5F5',
        flex: 1,
        marginLeft: 10,
        marginTop: 8
    },
    leftCateItem:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 44,
        borderLeftWidth: 3,
        borderLeftColor: 'white'
    },
    leftCateItemActive:{
        backgroundColor: '#F5F5F5',
        borderLeftColor: 'red'
    },
    leftCateItemInactive:{
        backgroundColor: 'white',
        borderLeftColor: 'white'
    },
    leftCateItemWord:{
        fontSize: 13,
        color:'#333'
    },
    leftCateItemWordActive:{
        color:'red'
    },
    rightCell:{
        height: 110,
        width: (width - 140) / 3,
        backgroundColor: 'white',
        marginBottom: 8,
        marginRight: 10,
        alignItems: 'center'
    },
    rightCellImg:{
        width: (width - 140) / 3,
        height: (width - 140) / 3,
        marginBottom: 3,
        backgroundColor: 'green',
    },
    rightCellTxt:{
        color: '#ccc',
        fontSize: 12,
        textAlign: 'center'
    }
});

