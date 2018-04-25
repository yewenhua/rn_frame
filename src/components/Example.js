import React, { Component } from 'react';
import { Button, SearchBar, List, Radio, Accordion, Grid, Steps, WingBlank, Carousel } from 'antd-mobile';
import { View, ScrollView, Image } from 'react-native';

const RadioItem = Radio.RadioItem;
const griddata = Array.from(new Array(9)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
}));
const Step = Steps.Step;

export default class Example extends Component {
    state = {
        value: 0,
        data: ['', '', ''],
        initialHeight: 200
    };

    onChange = (value) => {
        console.log('checkbox');
        this.setState({
            value,
        });
    };

    onChangeAccordion = (key) => {
        console.log(key);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    render() {
        const { value, value2, value3, value4 } = this.state;
        const data = [
            { value: 0, label: 'Doctor' },
            { value: 1, label: 'Bachelor' }
        ];
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};

        return (
            <ScrollView>
                <Carousel
                    className="my-carousel"
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    swipeSpeed={35}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(ii => (
                        <View key={ii} style={hProp}>
                            <Image
                                style={hProp}
                                source={{uri: 'https://zos.alipayobjects.com/rmsportal/'+ii+'.png'}}
                            />
                        </View>
                    ))}
                </Carousel>
                <Grid data={griddata} columnNum={3} />
                <SearchBar placeholder="搜索" maxLength={8} />
                <List renderHeader={() => 'RadioItem Demo'}>
                    {data.map(i => (
                        <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChangeAccordion}>
                    <Accordion.Panel header="Title 1">
                        <List className="my-list">
                            <List.Item>Content 1</List.Item>
                            <List.Item>Content 2</List.Item>
                            <List.Item>Content 3</List.Item>
                        </List>
                    </Accordion.Panel>
                    <Accordion.Panel header="Title 2" className="pad">this is panel content2 or other</Accordion.Panel>
                    <Accordion.Panel header="Title 3" className="pad">
                        Text text text text text text text text text text text text text text text
                    </Accordion.Panel>
                </Accordion>
                <WingBlank size="lg">
                    <Button className="btn" type="primary">primary button</Button>
                    <Steps size="small" current={1}>
                        <Step title="Finished" description="This is description" />
                        <Step title="In Progress" description="This is description" />
                        <Step title="Waiting" description="This is description" />
                    </Steps>
                </WingBlank>
            </ScrollView>
        );
    }
}