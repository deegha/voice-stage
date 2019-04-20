import { USER_STATUS } from '../config/config'

import moment from 'moment'
export const userObj = {
  displayName: '',
  email: '',
  emailVerified: false,
  phoneNumber: '',
  photoURL: '',
  providerId: '',
  numberOfPosts: 0,
  reportedCount: 0,
  reputation: 0,
  location: '',
  age: null,
  status: USER_STATUS.ACTIVE,
  favTags: [],
  createdAt: moment().unix()
}