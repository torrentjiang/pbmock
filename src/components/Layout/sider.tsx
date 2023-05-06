import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;

interface IProps {
  sliders: any[];
}

export default (props: IProps) => {
  const { sliders } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sider
      width={256}
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      style={{ position: 'relative' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          color: '#fff',
          fontSize: 16
        }}
      >
        {isCollapsed ? (
          <span>pbMock</span>
        ) : (
          <div>
            {/* <img src={''} height="18" width="18" /> */}
            <span style={{ marginLeft: 10 }}>pbMock</span>
          </div>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        className="menu-scrollbar"
        style={{ borderRight: 0, height: 'calc(100% - 100px)', overflowY: 'auto' }}
      >
        {sliders &&
          sliders.map((item: any) => {
            if (!item.isHidden) {
              if (item.children) {
                return (
                  <SubMenu
                    key={item.id}
                    title={
                      <span>
                        {isCollapsed ? (
                          <Icon type={item.icon} />
                        ) : (
                          <div>
                            <Icon type={item.icon} />
                            {item.text}
                          </div>
                        )}
                      </span>
                    }
                  >
                    {item.children &&
                      item.children.map((subItem: any) => {
                        if (!subItem.isHidden) {
                          return (
                            <Menu.Item key={subItem.id}>
                              <Link to={subItem.path}>{subItem.text}</Link>
                            </Menu.Item>
                          );
                        }
                      })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={item.id} title={item.text}>
                    <Link to={item.path}>
                      <Icon type={item.icon} />
                      {isCollapsed ? "" : item.text}
                    </Link>
                  </Menu.Item>
                );
              }
            }
          })}
      </Menu>

      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          color: '#fff',
          fontSize: 20,
          width: '100%',
          height: '50px',
          lineHeight: '50px',
          textAlign: 'center'
        }}
      >
        <Icon
          className="trigger"
          type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        />
      </div>
    </Sider>
  );
};
