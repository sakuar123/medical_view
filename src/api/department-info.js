import request from "@/utils/request";

export function get(param) {
  return new request({
    url: "/medical/department-info/" + param,
    method: "get"
  });
}

export function search(params) {
  return new request({
    url: "/medical/department-info/",
    method: "get",
    params
  });
}

export function getDepartmentInfo() {
  return new request({
    url: "/medical/department-info/getDepartmentInfo",
    method: "get"
  });
}

export function create(data) {
  return new request({
    url: "/medical/department-info/",
    method: "post", data
  });
}

export function modify(data) {
  return new request({
    url: "/medical/department-info/",
    method: "put", data
  });
}

export function remove(param) {
  return new request({
    url: "/medical/department-info/" + param,
    method: "delete"
  });
}
