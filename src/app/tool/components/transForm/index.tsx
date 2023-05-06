import React, { useState, useEffect } from 'react';
import { Input, Row, Button, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { callbackify } from 'util';
import { PbTranform } from '@/lib/pbTranform';

const { TextArea } = Input;

export default Form.create()((props: FormComponentProps) => {
  const { getFieldDecorator } = props.form;

  const [value, setValue] = useState('');

  const pbTranform = (): any => {
    // 构造函数需要实现的功能， parse后构造函数的值会被赋值到interface变量上面
    // 可以通过构造函数获取到处理之后的值
    // 2. 处理数据
    const data = props.form.getFieldsValue(['text1']);
    // 1. 构造类
    const pbTranform = new PbTranform(data.text1);
    return pbTranform;
  };

  const change2Ts = () => {
    setValue(pbTranform().parseTsStr());
  };

  const change2Json = () => {
    const json = JSON.parse(pbTranform().parseJsonStr());
    setValue(JSON.stringify(json, null, 4));
  };

  return (
    <Row style={{ margin: '0 20px' }}>
      <Col span={10}>
        <Form>
          <Form.Item>
            {getFieldDecorator('text1', {
              initialValue: ''
            })(
              <TextArea
                rows={33}
                style={{
                  resize: 'none',
                  width: '100%'
                }}
                placeholder="请在此黏贴PB文件"
              ></TextArea>
            )}
          </Form.Item>
        </Form>
      </Col>
      <Col span={4} style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={change2Ts}>
          转换TS
        </Button>
        <br />
        <br />
        <Button type="primary" onClick={change2Json}>
          转换JSON
        </Button>
      </Col>
      <Col span={10}>
        <TextArea
          rows={33}
          value={value}
          style={{ resize: 'none' }}
          placeholder="转换后的内容"
        ></TextArea>
      </Col>
    </Row>
  );
});
