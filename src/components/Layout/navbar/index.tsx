import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { Context } from '../../../app.store';
import './index.scss';

const Header = Layout.Header;

interface IProps {
  navs: any[];
  onChange: (key: string) => void;
}

export default (props: IProps) => {
  const { navs, onChange } = props;
  const { selectKey, setSelectKey } = useContext(Context);
  const [activeKey, setActiveKey] = useState('1');
  let [scrollLeft, scrollStep] = [0, 100];
  const navContainer: any = React.createRef();
  const navBar: any = React.createRef();
  const left: any = React.createRef();
  const right: any = React.createRef();

  const changeHeaderSelect = (name: string, id: string) => {
    onChange(name);
    setSelectKey(id + '');
    setActiveKey(id + '');
    sessionStorage.setItem('selectKey', id + '');
  };

  const changeToIndex = () => {
    changeHeaderSelect('home', '0');
  };

  // const resizeInnerNav = () => {
  //   let navItem = navBar.current.children;
  //   let width = 20 * 2 + 1; // 箭头留白的宽度

  //   for (let i = 0; i < navItem.length; i++) {
  //     width += navItem[i].offsetWidth;
  //   }

  //   const containerWidth = document.body.offsetWidth - 200 - 100; // 左边sider宽度 + 右边登录组件宽度

  //   if (containerWidth >= width) {
  //     left.current.style.display = 'none';
  //     right.current.style.display = 'none';
  //   } else {
  //     left.current.style.display = 'block';
  //     right.current.style.display = 'block';
  //   }
  //   width = width < 500 ? 500 : width;
  //   navBar.current.style.width = width + 'px';
  // };
  const scrollBtnClick = (step: number) => {
    let curScrollLeft = scrollLeft - step;
    if (
      (step > 0 &&
        navBar.current.offsetWidth - Math.abs(curScrollLeft) >=
          navContainer.current.offsetWidth - scrollStep) ||
      (step < 0 && curScrollLeft <= 0)
    ) {
      scrollLeft = curScrollLeft;
      navBar.current.style.transform = 'translateX(' + scrollLeft + 'px)';
    }
  };
  const handleScroll = (e: any) => {
    if (e.deltaY > 0) {
      scrollBtnClick(scrollStep);
    } else {
      scrollBtnClick(-scrollStep);
    }
  };

  useEffect(() => {
    const sessionSelectKey = sessionStorage.getItem('selectKey');
    if (sessionSelectKey && selectKey !== sessionSelectKey) {
      setActiveKey(sessionSelectKey);
    }
    // resizeInnerNav();
  });

  return (
    <div className={'nav-container-outer'}>
      {/* <span ref={left} onClick={() => scrollBtnClick(-scrollStep)}>
        <Icon className={'nav-btn nav-btn-left'} type="left" />
      </span> */}
      <div className={'nav-container'} ref={navContainer} onWheel={handleScroll}>
        <div className={'nav-bar'} ref={navBar}>
          <span className={activeKey === '0' ? 'nav-item active' : 'nav-item'}>
            <Link to="/" className={'nav-item'} onClick={changeToIndex}>
              首页
            </Link>
          </span>
          {navs &&
            navs.map((item, index) => {
              return (
                <span
                  key={index}
                  className={activeKey === item.id + '' ? 'nav-item active' : 'nav-item'}
                  onClick={() => changeHeaderSelect(item.name, item.id)}
                >
                  {/* <Link to={`/${item.name}`} className={'nav-item'} onClick={changeToIndex}> */}
                  <div className={'nav-item'}>{item.text}</div>
                  {/* </Link> */}
                </span>
              );
            })}
        </div>
      </div>
      {/* <span ref={right} onClick={() => scrollBtnClick(scrollStep)}>
        <Icon className={'nav-btn nav-btn-right'} type="right" />
      </span> */}
    </div>
  );
};
