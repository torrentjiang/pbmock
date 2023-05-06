import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

declare type ResultPromise = Promise<{
    value?: string,
    type: 'ok' | 'cancle'
}>;

declare type Props = {
    Content: React.ComponentType<FormComponentProps>,
    title: string,
    width?: number,
    submit: (values: any) => Promise<any>
};

export default (props: Props): ResultPromise => {
    const {title, Content, width, submit} = props;
    let formRef: FormComponentProps['form'] | null = null;

    const FormWrapper = Form.create()((props) => {
        return (
            <Content {...props}/>
        );
    });

    return new Promise((resolve => {
        Modal.info({
            title,
            width,
            content: <FormWrapper ref={node => formRef = node}/>,
            onOk(cb) {
                formRef!.validateFields((err, values) => {
                    if (!err) {
                        submit(values).then(res => {
                            if (res.status === 0) {
                                message.info('提交成功');
                                cb();
                                resolve();
                            }
                        });
                    }
                });
            },
            onCancel() {
                resolve();
            },
            okText: '提交',
            cancelText: '取消',
            maskClosable: true
        });
    }));
};