import request from '@/utils/request';

export function search(params) {
  return request({
    url: "/medical/announcement-info/",
    method: "get",
    params
  })
}

export function get(param) {
  return request({
    url: "/medical/announcement-info/" + param,
    method: "get"
  })
}

export function create(data) {
  return request({
    url: "/medical/announcement-info/",
    method: "post", data
  })
}

export function update(data) {
  return request({
    url: "/medical/announcement-info/",
    method: "put", data
  })
}

export function reomve(param) {
  return request({
    url: "/medical/announcement-info/" + param,
    method: "delete"
  })
}
