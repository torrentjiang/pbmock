import React, { useContext, useEffect } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Context } from '../../index.store';
import { formItemLayout } from '@/common/style';

export default Form.create()((props: FormComponentProps) => {
  const { getFieldDecorator } = props.form;
  const { modalFormData } = useContext(Context);

  return (
    <Form {...formItemLayout}>
      <Form.Item label="项目名">
        {getFieldDecorator('projectName', {
          rules: [{ required: true, message: '请输入项目名' }],
          initialValue: modalFormData.name || ''
        })(<Input placeholder="请输入项目名" />)}
      </Form.Item>
    </Form>
  );
});
