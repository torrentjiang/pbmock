import React, { useRef, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { Layout } from 'antd';
import Transform from './components/transForm';

const { Header, Footer, Sider, Content } = Layout;

export default (props: RouteComponentProps) => {
  return <Transform />;
};
