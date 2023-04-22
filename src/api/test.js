import request from '@/utils/request'

export function getTableData() {
  return request({
    url: 'getHaoKanVideo?page=0&size=2',
    method: 'get'
  })
}
