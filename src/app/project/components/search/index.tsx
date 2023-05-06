import React, { useContext } from 'react';
import { Form, Input, Button, Row, Select } from 'antd';
import { Context } from '../../index.store';
import { FormComponentProps } from 'antd/lib/form';
import { dealEmptyField } from '@lib/form';
import { getQueryVariable } from '@/common/utils/queryVariable';

export default Form.create()((props: FormComponentProps) => {
  const { getFieldDecorator, validateFields } = props.form;
  const { setSearchData } = useContext(Context);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((bool: boolean, values: any) => {
      const fieldsValue = values;
      dealEmptyField(fieldsValue);

      const queryData = {
        ...fieldsValue,
        current: 1,
        size: 10,
        groupId: getQueryVariable('group'),
        teamId: getQueryVariable('team')
      };
      setSearchData(queryData);
    });
  };
  const reset = () => {
    props.form.resetFields();
    const query = {
      current: 1,
      size: 10,
      groupId: getQueryVariable('group'),
      teamId: getQueryVariable('team')
    };
    setSearchData(query);
  };

  return (
    <Row type="flex" justify="start">
      <Form
        layout="inline"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <Form.Item>
          {getFieldDecorator('projectName', {})(<Input placeholder="项目名"></Input>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('gatewayName', {})(<Input placeholder="网关名"></Input>)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => reset()}>重置</Button>
        </Form.Item>
      </Form>
    </Row>
  );
});
