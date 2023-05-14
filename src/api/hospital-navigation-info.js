import request from "@/utils/request";

export function search(parma) {
  return new request({
    url: "/medical/hospital-navigation-info/",
    method: "get",
    parma
  });
}

export function getRegion() {
  return new request({
    url: "/medical/region-info/",
    method: "get"
  });
}

export function create(data) {
  return new request({
    url: "/medical/hospital-navigation-info/",
    method: "post",
    data
  });
}
