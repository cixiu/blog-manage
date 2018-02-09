import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { message } from 'antd'
import { addAdminInfo, IAdminInfo } from '../../store/admin-info'
import { getAdminInfo } from '../../api/admin'

interface IProps extends RouteComponentProps<any> {}
interface IReduxProps extends IProps {
  addAdminInfo: (info: IAdminInfo) => void
}

class AuthRoute extends React.Component<IProps, {}> {
  get injected() {
    return this.props as IReduxProps
  }
  async componentDidMount() {
    const { pathname } = this.injected.location
    const redirectRouter = ['/', '/login']
    const res = await getAdminInfo()
    if (res.code === 0) {
      this.injected.addAdminInfo(res.data)
      if (redirectRouter.indexOf(pathname) > -1) {
        message.success('检测到您之前登录过，系统自动为您登录！')
        this.injected.history.push('/admin_list')
      }
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    return null
  }
}

const mergeProps = (
  stateProps: object,
  dispatchProps: object,
  ownProps: object
) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default withRouter(connect(null, { addAdminInfo }, mergeProps)(AuthRoute))
