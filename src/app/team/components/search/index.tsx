import React, { useContext } from 'react';
import { Form, Input, Button, Row, Select } from 'antd';
import { Context } from '../../index.store';
import { FormComponentProps } from 'antd/lib/form';
import { dealEmptyField } from '@lib/form';

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
        size: 10
      };
      setSearchData(queryData);
    });
  };
  const reset = () => {
    props.form.resetFields();
    const query = {
      current: 1,
      size: 10
    };
    setSearchData(query);
  };

  return (
    <Row type="flex" justify="start">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>{getFieldDecorator('name', {})(<Input placeholder="团队名"></Input>)}</Form.Item>
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
