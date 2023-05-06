import React, { useContext } from 'react';
import { Form, Input, Button, Row, Select } from 'antd';
import { Context } from '../../index.store';
import { FormComponentProps } from 'antd/lib/form';
import { dealEmptyField } from '@lib/form';
import { getQueryVariable } from '@/common/utils/queryVariable';

const { Option } = Select;

export default Form.create()((props: FormComponentProps) => {
  const { getFieldDecorator, validateFields } = props.form;
  const { setSearchData, setModalVisible, setModalType } = useContext(Context);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((bool: boolean, values: any) => {
      const fieldsValue = values;
      dealEmptyField(fieldsValue);

      const queryData = {
        ...fieldsValue,
        projectId: getQueryVariable('project'),
        current: 1,
        size: 10
      };
      setSearchData(queryData);
    });
  };
  const reset = () => {
    props.form.resetFields();
    const query = {
      projectId: getQueryVariable('project'),
      current: 1,
      size: 10
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
          {getFieldDecorator('apiPath', {})(<Input placeholder="接口路径"></Input>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('gatewayName', {})(<Input placeholder="网关"></Input>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('pbLink', {})(<Input placeholder="pb链接"></Input>)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => reset()}>重置</Button>
        </Form.Item>
        <Form.Item>
          <Button
            icon={localStorage.getItem('gitAccessToken') ? 'check' : 'close'}
            type={localStorage.getItem('gitAccessToken') ? 'primary' : 'danger'}
            onClick={() => {
              setModalVisible(true);
              setModalType('token');
            }}
          >
            访问令牌
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
});
