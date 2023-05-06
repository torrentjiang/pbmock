import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from './index.scss?l';
import { Context } from '../../index.store';

export default Form.create()((props: FormComponentProps) => {
  const { setModalVisible, setModalType, setModalFormData } = useContext(Context);

  const [flg, setFlg] = useState(true);

  const add = () => {
    setModalType('add');
    setModalVisible(true);
    setModalFormData({});
  };

  useEffect(() => {
    const path = location.hash.slice(1);
    path === '/projects' && setFlg(false);
  }, []);

  return flg ? (
    <div className={styles.add}>
      <Button type="primary" onClick={add}>
        新增
      </Button>
    </div>
  ) : null;
});
