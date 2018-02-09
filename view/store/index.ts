import { combineReducers } from 'redux'
import { adminInfo, IAdminInfo } from './admin-info'

export interface IStateStore {
  adminInfo: IAdminInfo
}

export default combineReducers({
  adminInfo
})
