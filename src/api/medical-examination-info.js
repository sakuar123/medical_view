import request from "@/utils/request";

export function get(param) {
  return new request({
    url: "/medical/medical-examination-info/" + param,
    method: "get"
  })
}

export function search(params) {
  return new request({
    url: "/medical/medical-examination-info/",
    method: "get", params
  })
}

export function getMedicalComboInfo() {
  return new request({
    url: "/medical/medical-examination-info/getMedicalComboInfo",
    method: "get",
  })
}

export function create(data) {
  return new request({
    url: "/medical/medical-examination-info/",
    method: "post",
    data
  })
}

export function modify(data) {
  return new request({
    url: "/medical/medical-examination-info/",
    method: "put",
    data
  })
}

export function remove(param) {
  return new request({
    url: "/medical/medical-examination-info/" + param,
    method: "delete"
  })
}
