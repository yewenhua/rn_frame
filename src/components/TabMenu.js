import React, { Component } from 'react';
import { SearchBar, Tabs, WhiteSpace, ListView } from 'antd-mobile';
import {
    View,
    ScrollView,
    Image,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native';

export default class TabMenu extends Component {
    state: {
        fadeAnim: Animated,
        currentAlpha:number,
    };

    constructor(props) {
        super(props);
        this.state = {//设置初值
            currentAlpha: 1.0,//标志位，记录当前value
            fadeAnim: new Animated.Value(1.0)
        };
    }
    startAnimation(){
        this.state.currentAlpha = this.state.currentAlpha == 1.0 ? 0.0 : 1.0;
        Animated.timing(
            this.state.fadeAnim,
            {toValue: this.state.currentAlpha}
        ).start();
    }

    renderContent = tab =>
        (<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 150, backgroundColor: '#fff' }}>
            <Text>Content of {tab.title}</Text>
        </View>);


    render() {
        const tabs = [
            { title: '1st Tab' },
            { title: '2nd Tab' },
            { title: '3rd Tab' },
            { title: '4th Tab' },
            { title: '5th Tab' },
            { title: '6th Tab' },
            { title: '7th Tab' },
            { title: '8th Tab' },
            { title: '9th Tab' },
        ];

        return (
            <View>
                <SearchBar placeholder="搜索" maxLength={8} />
                <ScrollView>
                    <View>
                        <WhiteSpace />
                        <Tabs tabs={tabs}>
                            {this.renderContent}
                        </Tabs>
                        <WhiteSpace />
                    </View>
                    <Animated.Text style={{opacity: this.state.fadeAnim, //透明度动画
                        transform: [//transform动画
                            {
                                translateY: this.state.fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [60, 0] //线性插值，0对应60，0.6对应30，1对应0
                                }),
                            },
                            {
                                scale:this.state.fadeAnim
                            },
                        ],
                    }}>
                        Welcome to React Native!
                    </Animated.Text>
                    <TouchableOpacity onPress = {()=> this.startAnimation()}>
                        <Text>Start Animation</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}