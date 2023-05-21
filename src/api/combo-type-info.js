import request from "@/utils/request";

export function get(param) {
  return new request({
    url: "/medical/combo-type-info/" + param,
    method: "get"
  })
}

export function getComboType() {
  return new request({
    url: "/medical/combo-type-info/getComboType",
    method: "get"
  })
}

export function search(params) {
  return new request({
    url: "/medical/combo-type-info/",
    method: "get", params
  })
}

export function create(data) {
  return new request({
    url: "/medical/combo-type-info/",
    method: "post",
    data
  })
}

export function modify(data) {
  return new request({
    url: "/medical/combo-type-info/",
    method: "put",
    data
  })
}

export function remove(param) {
  return new request({
    url: "/medical/combo-type-info/" + param,
    method: "delete"
  })
}
