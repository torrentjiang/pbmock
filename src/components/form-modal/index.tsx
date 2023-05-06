import React, {useEffect} from 'react';
import Modal from '../modal';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';

declare interface Iprops extends ModalProps {
  submit: (values: any) => void
  children: (props: FormComponentProps) => JSX.Element
}

let form: any = null;

export default (props: Iprops) => {

  const FormComponent = Form.create()(props.children);

  const { onOk, onCancel } = props;

  const submit = (e: any) => {
    e.preventDefault();
    form.validateFields((bool: boolean, values: any) => {
      if (!bool) {
        props.submit(values)
      }
    })
  }

  return (
    <Modal
      {...props}
      onOk={(e) => {submit(e); onOk && onOk(e);}}
      onCancel={(e) => {form.resetFields(); onCancel && onCancel(e);}}>
      <FormComponent ref={(node: any) => (form = node)} />
    </Modal>
  )
}