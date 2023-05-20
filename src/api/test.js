import request from '@/utils/request'

export function getTableData(params) {
  return request({
    url: '/medical/professional-title-info/', method: 'get', params
  })
}

export function test1() {
  return request({
    url: '/t1', method: 'get'
  })
}

export function test2() {
  return request({
    url: '/t2', method: 'get'
  })
}

export function createProfessionalTitleInfo(data) {
  return request({
    url: "/medical/professional-title-info/", method: 'post', headers: {
      "Content-Type": "application/json",
    }, data
  })
}

export function getProfessionalTitleInfo(parma) {
  return request({
    url: "/medical/professional-title-info/" + parma, method: 'get'
  })
}

export function updateProfessionalTitleInfo(data) {
  return request({
    url: "/medical/professional-title-info/", method: 'put', headers: {
      "Content-Type": "application/json",
    }, data
  })
}

export function removeProfessionalTitleInfo(parma) {
  return request({
    url: "/medical/professional-title-info/" + parma, method: 'delete'
  })
}

export function getProfessionalTitleInfos() {
  return request({
    url: '/medical/professional-title-info/getProfessionalTitleInfo', method: 'get'
  })
}
