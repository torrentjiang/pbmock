import React, { useRef, useEffect, useContext } from 'react';
import { Form, Input, Button, Row, Col, Icon, Tabs, Modal, Spin, message } from 'antd';
import styles from './index.scss?l';
import { RouteComponentProps } from 'react-router';
import { login } from './index.model';

const FormWrap = Form.create()((props: any) => {
  const { _props } = props;

  const { getFieldDecorator } = props.form;

  const FormItem = Form.Item;
  const { TabPane } = Tabs;
  const { confirm } = Modal;
  const antIcon = <Icon type="loading" style={{ fontSize: '24px', marginLeft: '50px', marginTop: '10px' }} spin />;

  useEffect(() => {}, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { username, password } = values;
        login({
          username,
          password
        }).then(res => {
          if (res.errCode !== 0) {
            message.error(res.message || '账户密码错误~');
            return;
          }
          localStorage.setItem('token', res.data.token);
          _props.history.push('home');
        });
      }
    });
  };

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.login}>
          <div className={styles.loginContent}>
            <Tabs activeKey={'1'} onChange={() => {}} className={styles.tabsStyle} size={'large'}>
              <TabPane tab="账号登录" key="1">
                <Form className={styles.loginForm} onSubmit={handleSubmit}>
                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入用户名!' }]
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入用户名"
                      />
                    )}
                  </FormItem>

                  <div style={{ height: '10px' }}></div>

                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }]
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请输入密码"
                      />
                    )}
                  </FormItem>

                  <div style={{ height: '10px' }}></div>

                  <div style={{ height: '10px' }}></div>

                  <FormItem className={styles.buttonFormItem}>
                    <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                      登录
                    </Button>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
});

export default (props: RouteComponentProps) => {
  return (
    <div>
      <FormWrap _props={props} />
    </div>
  );
};
