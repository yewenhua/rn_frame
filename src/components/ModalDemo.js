import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity
} from 'react-native';

export default class ModalDemo extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isModal:false
        };
    }

    showModal() {
        this.setState({
            isModal:true
        })
    }

    //android 按返回键时回调
    onRequestClose() {
        this.setState({
            isModal:false
        });
    }

    render() {
        return(
            <View style={styles.container}>
                {/* 初始化Modal */}
                <Modal
                    animationType='slide'           // 从底部滑入
                    transparent={false}             // 不透明
                    visible={this.state.isModal}    // 根据isModal决定是否显示
                    onRequestClose={() => {this.onRequestClose()}}  // android必须实现
                >
                    <View style={styles.modalViewStyle}>
                        {/* 关闭页面 */}
                        <TouchableOpacity
                            onPress={() => {{
                                this.setState({
                                    isModal:false
                                })
                            }}}
                        >
                            <Text>关闭页面</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* 模态跳转 */}
                <TouchableOpacity
                    onPress={() => this.showModal()}
                >
                    <Text>模态跳转</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    modalViewStyle: {
        alignItems: 'center',
        justifyContent:'center',
        flex:1
    }
});