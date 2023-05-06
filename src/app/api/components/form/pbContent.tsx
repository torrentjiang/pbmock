import React, { useContext, useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Context, useStore } from '../../index.store';

const { TextArea } = Input;

export default Form.create()((props: FormComponentProps) => {
  const { getFieldDecorator } = props.form;

  const { modalType, pbContent } = useContext(Context);

  return (
    <>
      {modalType === 'jsonPerview' && (
        <Row style={{ margin: '0 20px 5px' }}>
          <div style={{marginBottom: '15px'}}>
            支持<a href="https://github.com/nuysoft/Mock/wiki/Syntax-Specification" target="_blank">
              自定义mock规则
            </a>，动态生成属性对应的value。
          </div>
        </Row>
      )}
      <Row style={{ margin: '0 20px 5px' }}>
        <Col span={24}>
          <Form>
            <Form.Item>
              {getFieldDecorator('text', {
                initialValue: pbContent || ''
              })(
                <TextArea
                  rows={20}
                  style={{
                    resize: 'none',
                    width: '100%'
                  }}
                  placeholder="请在此黏贴"
                ></TextArea>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
});
