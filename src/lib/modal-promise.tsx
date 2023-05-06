import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';

declare type ResultPromise = Promise<{
    value?: string,
    type: 'ok' | 'cancle'
}>;

declare type Props = {
    Content: React.ComponentType<{onChange: (value: string) => void}>,
    title: string,
    width?: number
};



export default (props: Props): ResultPromise => {
    const {title, Content, width} = props;

    let value!: any;

    const onChange = (val: any) => {
        value = val;
    };

    return new Promise((res => {
        Modal.info({
            title,
            width,
            content: <Content onChange={onChange} />,
            onOk() {
                res({
                    type: 'ok',
                    value
                });
            },
            onCancel() {
                res({
                    type: 'cancle'
                });
            },
            okText: '提交',
            cancelText: '取消',
            maskClosable: true
        })
    }));
};