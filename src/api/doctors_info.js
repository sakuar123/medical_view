import request from "@/utils/request";

export function search(params) {
  return new request({
    url: "/medical/doctors-info/",
    method: "get",
    params
  })
}

export function create(data) {
  return new request({
    url: "/medical/doctors-info/",
    method: "post",
    data
  })
}

export function getDoctorLables() {
  return new request({
    url: "/medical/doctors-info",
    method: "get"
  })
}
