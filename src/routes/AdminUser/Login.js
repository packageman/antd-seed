import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Input, Button, Icon, Checkbox, message } from 'antd';
import styles from './Login.less';
import adminUserActions from '../../actions/adminUser';
import * as session from '../../utils/session';

const FormItem = Form.Item;

@connect(state => ({
  adminUser: state.adminUser,
}), { ...adminUserActions, push: routerRedux.push })
@Form.create()
export default class Login extends Component {
  componentWillReceiveProps() {
    if (session.getCurrentUser()) {
      this.props.push('/overall');
      message.success('登录成功！');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(
      { force: true },
      (err, params) => {
        if (!err) {
          this.props.login(params);
        }
      }
    );
  }

  render() {
    const { form, adminUser } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {
              getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名！' }],
              })(<Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="请输入用户名"
              />)
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码！' }],
              })(<Input
                size="large"
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                type="password"
                placeholder="请输入密码"
              />)
            }
          </FormItem>
          <FormItem className={styles.additional}>
            {
              getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox className={styles.autoLogin}>自动登录</Checkbox>)
            }
            <a className={styles.forgot} href="/adminUser/forgorPassword">忘记密码</a>
            <Button
              size="large"
              loading={adminUser.submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
