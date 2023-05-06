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
      <Form.Item label="团队名">
        {getFieldDecorator('teamName', {
          rules: [{ required: true, message: '请输入团队名' }],
          initialValue: modalFormData.name || ''
        })(<Input placeholder="请输入团队名" />)}
      </Form.Item>
    </Form>
  );
});
