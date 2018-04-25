import React, {Component} from 'react';
import { TabBar } from 'antd-mobile';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import Utils from './Utils'

export default class BarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
        };
    }

    renderContent(pageText) {
        return (
            <View style={{ backgroundColor: 'white', height: Utils.size.height }}>
                <View style={{ paddingTop: 60 }}><Text style={{textAlign: 'center'}}>clicked “{pageText}” tab， show “{pageText}” information</Text></View>
            </View>
        );
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    title="Life"
                    key="Life"
                    icon={<Image src={{ uri: '../img/tumblr-audio.png' }}></Image>}
                    selectedIcon={<Image src={{ uri: '../img/tumblr-chat.png'}}></Image>}
                    selected={this.state.selectedTab === 'blueTab'}
                    badge={1}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                    }}
                    data-seed="logId"
                >
                    {this.renderContent('Life')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: '../img/tumblr-audio.png' }}
                    selectedIcon={{ uri: '../img/tumblr-chat.png' }}
                    title="Koubei"
                    key="Koubei"
                    badge={'new'}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                        });
                    }}
                    data-seed="logId1"
                >
                    {this.renderContent('Koubei')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: '../img/tumblr-audio.png' }}
                    selectedIcon={{ uri: '../img/tumblr-chat.png' }}
                    title="Friend"
                    key="Friend"
                    dot
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                    }}
                >
                    {this.renderContent('Friend')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: '../img/tumblr-audio.png' }}
                    selectedIcon={{ uri: '../img/tumblr-chat.png' }}
                    title="My"
                    key="my"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'yellowTab',
                        });
                    }}
                >
                    {this.renderContent('My')}
                </TabBar.Item>
            </TabBar>
        );
    }
}