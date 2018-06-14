import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ListView,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

class My extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        header:(
            null
        )
    });

    constructor(props) {
        super(props);
        this.state =  {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows([
                'Simplicity Matters',
                'Hammock Driven Development',
                'Value of Values',
                'Are We There Yet?',
                'The Language of the System',
                'Design, Composition, and Performance',
                'Clojure core.async',
                'The Functional Database',
                'Deconstructing the Database',
                'Hammock Driven Development',
                'Value of Values'
            ])
        };
    }

    render() {
        const { onScroll = (event) => {
            let Y = event.nativeEvent.contentOffset.y;
            if (Y < 100) {
                st = Y*0.01;
            } else {
                st = 1;
            }
            this._refHeader.setNativeProps({
                opacity:st
            });
        } } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#4ECBFC"
                    hidden={true}
                    barStyle="light-content"
                />
                <ListView
                    ref="ListView"
                    style={styles.container}
                    dataSource={ this.state.dataSource }
                    renderRow={(rowData) => (
                        <View key={rowData} style={ styles.row }>
                            <Text style={ styles.rowText }>
                                { rowData }
                            </Text>
                        </View>
                    )}
                    renderScrollComponent={props => (
                        <ParallaxScrollView
                            onScroll={onScroll}
                            headerBackgroundColor="#333"
                            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                            backgroundSpeed={10}

                            renderBackground={() => (
                                <View key="background">
                                    <Image source={{uri: 'https://maoxy.com/maoxy/assets/img/banner3.jpg',
                                        width: window.width,
                                        height: PARALLAX_HEADER_HEIGHT}}/>
                                    <View style={{position: 'absolute',
                                        top: 0,
                                        width: window.width,
                                        backgroundColor: 'rgba(0,0,0,.4)',
                                        height: PARALLAX_HEADER_HEIGHT}}/>
                                </View>
                            )}

                            renderForeground={() => (
                                <View key="parallax-header" style={ styles.parallaxHeader }>
                                    <Image style={ styles.avatar } source={{
                                        uri: 'https://maoxy.com/maoxy/assets/img/banner1.jpg',
                                        width: AVATAR_SIZE,
                                        height: AVATAR_SIZE
                                    }}/>
                                    <Text style={ styles.sectionSpeakerText }>
                                        猫小鱼
                                    </Text>
                                    <Text style={ styles.sectionTitleText }>
                                        哈佛大学工商管理博士
                                    </Text>
                                </View>
                            )}

                            renderStickyHeader={() => (
                                <View key="sticky-header" style={styles.stickySection}>
                                    <Text style={styles.stickySectionText}>猫小鱼</Text>
                                </View>
                            )}

                            renderFixedHeader={() => (
                                <View key="fixed-header" style={styles.fixedSection} ref={(e) => this._refHeader = e}>
                                    <Text style={styles.fixedSectionText} onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                                        返回顶部
                                    </Text>
                                </View>
                            )}/>
                    )}
                />
            </View>
        );
    }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'flex-end'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        opacity: 0,
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});

export default My;