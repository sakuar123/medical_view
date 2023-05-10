import request from '@/utils/request';

export function getPermissionList() {
  return new request({
    url: "/medical/permissions-info/getPermissionList",
    method: "get",
  })
}

export function getPermissions(param) {
  return new request({
    url: "/medical/permissions-info/getPermissions/" + param,
    method: "get",
  })
}
