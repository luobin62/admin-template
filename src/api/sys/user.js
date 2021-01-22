import request from '@/utils/request'
import { getUserId } from '@/utils/auth'

export function login(data) {
  return request({
    baseURL: '/api',
    url: '/login',
    method: 'post',
    data,
  })
}

export function logout() {
  return request({
    baseURL: '/api',
    url: '/logout',
    method: 'get',
  })
}

export function resetPassword(data) {
  return request({
    baseURL: '/api',
    url: '/user/updatePassword',
    method: 'post',
    data: data,
  })
}

export function getMenu() {
  const id = getUserId()
  return request({
    baseURL: '/api',
    url: '/menu/findNavTree?systemName=chip&userId=' + id,
    method: 'get',
  })
}
