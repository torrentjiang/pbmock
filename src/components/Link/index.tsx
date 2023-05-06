import React from 'react';
import styles from './index.scss?l';

export default (props:any) => {

  const {text, onClick} = props;

  return (
    <span className={styles.link} onClick={onClick}>{text}</span>
  )
}
