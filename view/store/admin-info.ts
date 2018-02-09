import { getAdminInfo } from '../api/admin'
// import { IStateStore } from './index';

const ERR_OK = 0

const ADMIN_INFO = 'ADMIN_INFO'

export interface IAdminInfo {
  user_name: string
  type: number
  id: number
  avatar: string
  create_time: string
  create_address: string
  admin: string
}
interface IAdminInfoAction {
  type: string
  info: IAdminInfo
}

export const addAdminInfo = (info: IAdminInfo) => {
  return {
    type: ADMIN_INFO,
    info
  }
}

export const getAdminData = () => async (dispatch: any) => {
  try {
    const res = await getAdminInfo()
    if (res.code === ERR_OK) {
      dispatch(addAdminInfo(res.data))
    } else {
      throw new Error(res)
    }
  } catch (err) {
    console.log('您尚未登陆或者session失效')
  }
}

export const adminInfo = (state = {}, action: IAdminInfoAction) => {
  switch (action.type) {
    case ADMIN_INFO:
      return action.info
    default:
      return state
  }
}
