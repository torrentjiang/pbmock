import React, { useContext } from 'react';
import { Form, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from './index.less';
import { Context } from '../../index.store';

export default Form.create()((props: FormComponentProps) => {
  const { setModalVisible, setModalType, setModalFormData } = useContext(Context);

  const add = () => {
    setModalType('add');
    setModalVisible(true);
    setModalFormData({});
  };

  return (
    <div className={styles.add}>
      <Button type="primary" onClick={add}>
        新增群组
      </Button>
    </div>
  );
});
