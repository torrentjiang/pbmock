import React, { useContext, useState, useEffect } from 'react';
import { Form, Input, Tabs } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Context } from '../../index.store';
import { formItemLayout } from '@/common/style';

const { TabPane } = Tabs;
const { TextArea } = Input;

export default Form.create()((props: FormComponentProps) => {
  const { getFieldDecorator } = props.form;
  const { modalFormData, modalType, tabKey, setTabKey } = useContext(Context);

  const callback = (key: any) => {
    console.log(key);
    setTabKey(key);
  };

  useEffect(() => {
    if (modalType === 'edit') {
      if (!modalFormData.pbLink) {
        setTabKey('1');
      } else {
        setTabKey('0');
      }
    }
  }, []);

  return (
    <Form {...formItemLayout}>
      {modalType === 'add' && (
        <Tabs defaultActiveKey={tabKey} size="small" animated={false} onChange={callback}>
          <TabPane tab="通过pb文件读取" key="0" forceRender={false}>
            <Form.Item label="接口路径">
              {getFieldDecorator('path', {
                rules: [{ required: true, message: '请输入接口路径' }],
                initialValue: modalFormData.path || ''
              })(<Input placeholder="请输入接口路径" />)}
            </Form.Item>
            <Form.Item label="接口描述">
              {getFieldDecorator('desc', {
                rules: [{ required: true, message: '请输入接口描述' }],
                initialValue: modalFormData.desc || ''
              })(<Input placeholder="请输入接口描述" />)}
            </Form.Item>
            {tabKey === '0' && (
              <>
                <Form.Item label="涉及网关">
                  {getFieldDecorator('gatewayName', {
                    initialValue: modalFormData.gateway || ''
                  })(<Input placeholder="请输入涉及网关" />)}
                </Form.Item>
                <Form.Item label="pb文件链接">
                  {getFieldDecorator('pbLink', {
                    rules: [{ required: true, message: '请输入pb文件链接' }],
                    initialValue: modalFormData.pbLink || ''
                  })(<Input placeholder="请输入pb文件链接" />)}
                </Form.Item>
                <Form.Item label="实体名" extra="不指定实体名，则默认读取整个pb文件">
                  {getFieldDecorator('apiName', {
                    initialValue: modalFormData.apiName || ''
                  })(<Input placeholder="请输入pb文件中的实体名，如：QueryDriverDetailsRes" />)}
                </Form.Item>
              </>
            )}
          </TabPane>
          <TabPane tab="手动填写" key="1" forceRender={false}>
            <Form.Item label="接口路径">
              {getFieldDecorator('path', {
                rules: [{ required: true, message: '请输入接口路径' }],
                initialValue: modalFormData.path || ''
              })(<Input placeholder="请输入接口路径" />)}
            </Form.Item>
            <Form.Item label="接口描述">
              {getFieldDecorator('desc', {
                rules: [{ required: true, message: '请输入接口描述' }],
                initialValue: modalFormData.desc || ''
              })(<Input placeholder="请输入接口描述" />)}
            </Form.Item>
            <Form.Item label="JSON">
              {getFieldDecorator('json', {
                initialValue: modalFormData.json || ''
              })(
                <TextArea
                  rows={10}
                  style={{
                    resize: 'none',
                    width: '100%'
                  }}
                  placeholder="请在此黏贴JSON"
                ></TextArea>
              )}
            </Form.Item>
          </TabPane>
        </Tabs>
      )}
      {modalType === 'edit' && tabKey === '0' && (
        <>
          <Form.Item label="接口路径">
            {getFieldDecorator('path', {
              rules: [{ required: true, message: '请输入接口路径' }],
              initialValue: modalFormData.path || ''
            })(<Input placeholder="请输入接口路径" />)}
          </Form.Item>
          <Form.Item label="接口描述">
            {getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入接口描述' }],
              initialValue: modalFormData.desc || ''
            })(<Input placeholder="请输入接口描述" />)}
          </Form.Item>
          <Form.Item label="涉及网关">
            {getFieldDecorator('gatewayName', {
              initialValue: modalFormData.gateway || ''
            })(<Input placeholder="请输入涉及网关" />)}
          </Form.Item>
          <Form.Item label="pb文件链接">
            {getFieldDecorator('pbLink', {
              rules: [{ required: true, message: '请输入pb文件链接' }],
              initialValue: modalFormData.pbLink || ''
            })(<Input placeholder="请输入pb文件链接" />)}
          </Form.Item>
          <Form.Item label="实体名" extra="不指定实体名，则默认读取整个pb文件">
            {getFieldDecorator('apiName', {
              initialValue: modalFormData.apiName || ''
            })(<Input placeholder="请输入pb文件中的实体名，如：QueryDriverDetailsRes" />)}
          </Form.Item>
        </>
      )}
      {modalType === 'edit' && tabKey === '1' && (
        <>
          <Form.Item label="接口路径">
            {getFieldDecorator('path', {
              rules: [{ required: true, message: '请输入接口路径' }],
              initialValue: modalFormData.path || ''
            })(<Input placeholder="请输入接口路径" />)}
          </Form.Item>
          <Form.Item label="接口描述">
            {getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入接口描述' }],
              initialValue: modalFormData.desc || ''
            })(<Input placeholder="请输入接口描述" />)}
          </Form.Item>
          <Form.Item label="JSON">
            {getFieldDecorator('json', {
              initialValue: modalFormData.json || ''
            })(
              <TextArea
                rows={10}
                style={{
                  resize: 'none',
                  width: '100%'
                }}
                placeholder="请在此黏贴JSON"
              ></TextArea>
            )}
          </Form.Item>
        </>
      )}
    </Form>
  );
});
