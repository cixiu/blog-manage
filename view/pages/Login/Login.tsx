import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { connect } from 'react-redux'
import { IStateStore } from '../../store'
import { IAdminInfo, getAdminData } from '../../store/admin-info'
import { login } from '../../api/admin'

import * as styles from './index.scss'

const FormItem = Form.Item

interface IProps extends FormComponentProps, RouteComponentProps<any> {} // tslint:disable-line
interface IReduxProps extends IProps  {
  adminInfo: IAdminInfo
  getAdminData(): void
}

class Login extends React.Component<IProps, {}> {
  // 使用类的存取器将this.props断言为注入了redux映射的props
  get injected() {
    return this.props as IReduxProps
  }
  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await login({
          user_name: values.userName,
          password: values.password,
          super_secret: values.superSecret
        })
        if (res.code === 0) {
          this.injected.getAdminData()
          message.success(res.message)
          this.props.history.push('/admin_list')
        } else if (res.code === 1) {
          message.error(res.message)
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div className={styles.login}>
          <h1 className={styles.title}>博客后台管理系统</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名！' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名，没有会自动注册哦~~"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('superSecret')(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="普通管理员可不用填写此选项"
                />
              )}
            </FormItem>
            <FormItem>
              <div className={styles.loginBtn}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginFormBtn}
                >
                  登录
                </Button>
              </div>
            </FormItem>
          </Form>
          <div className={styles.loginTips}>
            <p>没有注册的用户名会自动注册为普通管理员!</p>
            <p>超级管理员需要超级密码!</p>
          </div>
        </div>
        <div className={styles.bg} />
      </div>
    )
  }
}

const mapStateToProps = (state: IStateStore) => {
  return {
    adminInfo: state.adminInfo
  }
}
const mapDispatchToProps = { getAdminData }

const mergeProps = (
  stateProps: object,
  dispatchProps: object,
  ownProps: object
) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default withRouter(
  Form.create()(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login))
)
