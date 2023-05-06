import React, { useRef, useEffect, useContext } from 'react';
import { Button, Icon } from 'antd';
import styles from './index.scss?l';

const ButtonGroup = Button.Group;

export default (props: any) => {
  const { text, backPath } = props;

  const goBack = () => {
    if (backPath) {
      props.history.push(backPath);
    } else {
      history.go(-1);
    }
  };

  return (
    <div className={styles.wrap}>
      <Button type="primary" onClick={goBack}>
        <Icon type="left" />
        {text || '返回'}
      </Button>
    </div>
  );
};
