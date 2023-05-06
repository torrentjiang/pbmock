import Cookie from './cookie';

export function getAuthorizationToken() {
  return localStorage.getItem('token') 
}
export function setAuthorizationToken(token: any) {
  return localStorage.setItem('token', token)
}
export function removeAuthorizationToken() {
  return localStorage.getItem('authorizationTokens')
}
export function getUserName() {
  return localStorage.getItem('UserName')
}
export function setUserName(name: any) {
  return localStorage.setItem('UserName', name)
}
export function removeUserName() {
  return localStorage.removeItem('UserName')
}
export function getUserUid() {
  return localStorage.getItem('UID')
}
export function setUserUid(uid: any) {
  return localStorage.setItem('UID', uid)
}
export function removeUserUid() {
  return localStorage.removeItem('UID')
}
export function getUserInfo() {
  return localStorage.getItem('userInfo')
}
export function setUserInfo(userInfo: any) {
  return localStorage.setItem('userInfo', JSON.stringify(userInfo))
}
export function removeUserInfo() {
  return localStorage.removeItem('userInfo')
}

export function clearAll() {
  removeAuthorizationToken()
  removeUserInfo()
  removeUserName()
  removeUserUid()
}