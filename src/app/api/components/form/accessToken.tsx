import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Context } from '../../index.store';
import { formItemLayout } from '@/common/style';

export default Form.create()((props: FormComponentProps) => {
  const { getFieldDecorator } = props.form;
  const { modalFormData } = useContext(Context);

  return (
    <Form {...formItemLayout}>
      <Form.Item label="设置参考">
        <a
          href="#"
          target="_blank"
          title="点击跳转"
        >
          生成git访问令牌
        </a>
      </Form.Item>
      <Form.Item label="访问令牌" extra="不设置则使用默认令牌，但默认令牌不保证拥有项目权限。">
        {getFieldDecorator('accessToken', {
          initialValue: localStorage.getItem('gitAccessToken') || ''
        })(<Input placeholder="请输入访问令牌" />)}
      </Form.Item>
    </Form>
  );
});
