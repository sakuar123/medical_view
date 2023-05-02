import request from '@/utils/request';

export function updatePwd(parma) {
  return request({
    url: "/medical/administrators-info/updatePwd",
    method: 'post',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    params: {
      newPassword: parma
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  });
}
