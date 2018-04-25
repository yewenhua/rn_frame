import React, { Component } from 'react';
import { SearchBar, Tabs, WhiteSpace, ListView } from 'antd-mobile';
import { View, Image, Text } from 'react-native';
import Utils from './Utils'

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
let index = data.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

export default class Lists extends Component {
    constructor(props) {
        super(props);
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: Utils.size.height * 3 / 4,
        };
    }

    componentDidMount() {
        const hei = Utils.size.height - 50;
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }

        this.setState({ isLoading: true });
        setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    render() {
        const separator = (sectionID, rowID) => (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#f4f4f4',
                    height: 8,
                    borderWidth: 1,
                    borderColor: '#ECECED',
                    borderStyle: 'solid',
                    borderLeftWidth: 0,
                    borderRightWidth: 0
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <View key={rowID} style={{ paddingTop: 0, paddingRight: 15, paddingBottom: 0, paddingLeft: 15 }}>
                    <View
                        style={{
                            height: 30,
                            color: '#888',
                            fontSize: 18,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f4f4f4',
                            borderBottomStyle: 'solid',
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{obj.title}</Text>
                    </View>
                    <View style={{ display: '-webkit-box', display: 'flex', flexDirection: 'row', paddingTop: 15, paddingRight: 0, paddingBottom: 15, paddingLeft: 0 }}>
                        <Image style={{ height: 64, width: 64, marginRight: 15 }} source={{uri:obj.img}} />
                        <View style={{ lineHeight: 1, flex: 1 }}>
                            <View style={{ marginBottom: 8, fontWeight: 'bold' }}>
                                <Text>{obj.des}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 30, color: '#FF6E27' }}>¥ 35</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        };

        return (
            <View>
                <SearchBar placeholder="搜索" maxLength={8} />
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<View style={{ padding: 30 }}>
                        <Text>{this.state.isLoading ? 'Loading...' : 'Loaded'}</Text>
                    </View>)}

                    renderRow={row}
                    renderSeparator={separator}
                    style={{
                        height: this.state.height
                    }}
                    pageSize={4}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={200}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </View>
        );
    }
}