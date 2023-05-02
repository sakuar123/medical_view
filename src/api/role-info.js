import request from '@/utils/request';

export function getRoleList() {
  return request({
    url: "/medical/role-info/roleList",
    method: "get"
  })
}
