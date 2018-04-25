import React from 'react'
import PropTypes from 'prop-types'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class Counter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { counter, increment, doubleAsync } = this.props;
        return (
            <View style={styles.container} >
                <WingBlank size="md">
                    <Text>Counter: {counter}</Text>
                    <Button type="primary" onClick={increment}>increment</Button>
                    <WhiteSpace size="lg" />
                    <Button onClick={doubleAsync} style={styles.button}>Double (Async)</Button>
                </WingBlank>
            </View>
        );
    }
}

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    doubleAsync: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        marginVertical: 15
    }
});

export default Counter;

