import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Context } from '../../index.store';
import { formItemLayout } from '@/common/style';
import { getTeam } from '../../index.model';

const { Option } = Select;

export default Form.create()((props: FormComponentProps) => {
  const { getFieldDecorator } = props.form;
  const { modalFormData, modalType } = useContext(Context);

  const [teams, setTeams]: any = useState([]);

  useEffect(() => {
    getTeam().then((res: any) => {
      if (res && res.errCode === 0) {
        res.data && res.data.list && setTeams(res.data.list || []);
      }
    });
  }, []);

  return (
    <Form {...formItemLayout}>
      <Form.Item label="团队名">
        {getFieldDecorator('teamId', {
          rules: [{ required: true, message: '请选择团队名' }],
          initialValue: modalFormData.teamId || undefined
        })(
          <Select placeholder="请选择团队名" disabled={modalType === 'edit' ? true : false}>
            {teams.map((p: any) => {
              return <Option value={p.id}>{p.name}</Option>;
            })}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="群组名">
        {getFieldDecorator('groupName', {
          rules: [{ required: true, message: '请输入群组名' }],
          initialValue: modalFormData.groupName || ''
        })(<Input placeholder="请输入群组名" />)}
      </Form.Item>
    </Form>
  );
});
