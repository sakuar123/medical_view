import request from '@/utils/request';

export function search(params) {
  return request({
    url: "/medical/role-info/",
    method: "get",
    params
  })
}

export function get(param) {
  return request({
    url: "/medical/role-info/" + param,
    method: "get"
  })
}

export function create(data) {
  return request({
    url: "/medical/role-info/",
    method: "post", data
  })
}

export function update(data) {
  return request({
    url: "/medical/role-info/",
    method: "put", data
  })
}

export function reomve(param) {
  return request({
    url: "/medical/role-info/" + param,
    method: "delete"
  })
}
