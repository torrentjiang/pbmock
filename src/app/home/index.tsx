import React, { useRef, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './index.less';

export default (props: RouteComponentProps) => {
  useEffect(() => {}, []);

  return <div className={styles.wrap}>欢迎使用 pbMock</div>;
};
