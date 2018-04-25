import React, {Component} from 'react';
import { SwipeAction, List } from 'antd-mobile';

const SwipeList = () => (
    <List>
        <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: { backgroundColor: '#ddd', color: 'white' },
                },
                {
                    text: 'Delete',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
            left={[
                {
                    text: 'Reply',
                    onPress: () => console.log('reply'),
                    style: { backgroundColor: '#108ee9', color: 'white' },
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: { backgroundColor: '#ddd', color: 'white' },
                },
            ]}
            onOpen={() => console.log('global open')}
            onClose={() => console.log('global close')}
        >
            <List.Item
                extra="More"
                arrow="horizontal"
                onClick={e => console.log(e)}
            >
                左右都有按钮
            </List.Item>
        </SwipeAction>
        <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            left={[
                {
                    text: 'Reply',
                    onPress: () => console.log('reply'),
                    style: { backgroundColor: '#108ee9', color: 'white' },
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: { backgroundColor: '#ddd', color: 'white' },
                },
            ]}
            onOpen={() => console.log('global open')}
            onClose={() => console.log('global close')}
        >
            <List.Item
                extra="More"
                arrow="horizontal"
                onClick={e => console.log(e)}
            >
                左边有按钮
            </List.Item>
        </SwipeAction>
        <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: { backgroundColor: '#ddd', color: 'white' },
                },
                {
                    text: 'Delete',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
            onOpen={() => console.log('global open')}
            onClose={() => console.log('global close')}
        >
            <List.Item
                extra="More"
                arrow="horizontal"
                onClick={e => console.log(e)}
            >
                只有右边有按钮
            </List.Item>
        </SwipeAction>
        <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                {
                    text: 'short',
                    onPress: () => console.log('cancel'),
                    style: { backgroundColor: '#ddd', color: 'white' },
                },
                {
                    text: 'long text',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
            onOpen={() => console.log('global open')}
            onClose={() => console.log('global close')}
        >
            <List.Item
                extra="More"
                arrow="horizontal"
                onClick={e => console.log(e)}
            >
                不同按钮尺寸
            </List.Item>
        </SwipeAction>
        <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                {
                    text: 'button1',
                    onPress: () => console.log('cancel'),
                    style: { backgroundColor: '#ddd', color: 'white' },
                },
                {
                    text: 'button2',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
            onOpen={() => console.log('global open')}
            onClose={() => console.log('global close')}
        >
            <List.Item
                extra="More"
                arrow="horizontal"
                onClick={() => console.log('List.Item clicked!')}
            >
                只有点击
            </List.Item>
        </SwipeAction>
    </List>
);

export default SwipeList;