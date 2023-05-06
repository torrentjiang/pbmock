import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Context } from '../../app.store';
import Navbar from './navbar';

const Header = Layout.Header;

interface IProps {
  navs: any[];
  onChange: (key: string) => void;
}

export default (props: IProps) => {
  const { navs, onChange } = props;

  const { selectKey, setSelectKey } = useContext(Context);

  useEffect(() => {});

  return (
    <Header
      className={'header-menu'}
      style={{
        position: 'relative',
        background: '#00BFB3',
        height: 50,
        lineHeight: 50,
        padding: '0 100px 0 0'
      }}
    >
      <Navbar navs={navs} onChange={onChange}></Navbar>
    </Header>
  );
};
