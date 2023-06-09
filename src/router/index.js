import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: "index",
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      needLogin: false
    }
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      needLogin: false
    }
  },
  {
    path: '/home',
    name: "home",
    component: Layout,
    meta: {
      title: '后台管理',
      icon: 'table',
      needLogin: true
    }
  },
  {
    path: '/hospital',
    component: Layout,
    redirect: '/hospital/article/article_index.vue',
    meta: {
      title: '医院信息',
      icon: 'link',
      needLogin: true
    },
    children: [
      {
        path: 'article_index',
        name: 'article_index',
        component: () => import('@/views/hospital/article/article_index.vue'),
        meta: {
          title: '健康百科',
          needLogin: true
        }
      },
      {
        path: 'article_save',
        name: 'article_save',
        component: () => import('@/views/hospital/article/article_save.vue'),
        meta: {
          title: '健康百科',
          needLogin: true,
        },
        hidden: true,
      },
      {
        path: 'article_edit',
        name: 'article_edit',
        component: () => import('@/views/hospital/article/article_edit.vue'),
        meta: {
          title: '健康百科',
          needLogin: true,
        },
        hidden: true,
      },
      {
        path: 'hospital_navigation_index',
        name: 'hospital_navigation_index',
        component: () => import('@/views/hospital/hospital-navigation/hospital_navigation_index.vue'),
        meta: {
          title: '医院导航',
          needLogin: true
        }
      },
      {
        path: 'hospital_navigation_save',
        name: 'hospital_navigation_save',
        component: () => import('@/views/hospital/hospital-navigation/hospital_navigation_save.vue'),
        meta: {
          title: '医院导航',
          needLogin: true
        },
        hidden: true
      },
      {
        path: 'department_index',
        name: 'department_index',
        component: () => import('@/views/hospital/department/department_index.vue'),
        meta: {
          title: '科室管理',
          needLogin: true
        }
      },
      {
        path: 'department_save',
        name: 'department_save',
        component: () => import('@/views/hospital/department/department_save.vue'),
        hidden: true,
        meta: {
          title: '科室管理',
          needLogin: true
        }
      },
      {
        path: 'department_edit',
        name: 'department_edit',
        component: () => import('@/views/hospital/department/department_edit.vue'),
        hidden: true,
        meta: {
          title: '科室管理',
          needLogin: true
        }
      },
      {
        path: 'doctor_index',
        name: 'doctor_index',
        component: () => import('@/views/hospital/doctor/doctor_index.vue'),
        meta: {
          title: '医生管理',
          needLogin: true
        }
      },
      {
        path: 'doctor_save',
        name: 'doctor_save',
        component: () => import('@/views/hospital/doctor/doctor_save.vue'),
        meta: {
          title: '医生管理',
          needLogin: true
        },
        hidden: true
      },
      {
        path: 'combo_type_index',
        name: 'combo_type_index',
        component: () => import('@/views/hospital/combo-type/combo_type_index.vue'),
        hidden: true,
        meta: {
          title: '套餐类型管理',
          needLogin: true
        }
      },
      {
        path: 'combo_type_save',
        name: 'combo_type_save',
        component: () => import('@/views/hospital/combo-type/combo_type_save.vue'),
        hidden: true,
        meta: {
          title: '套餐类型管理',
          needLogin: true
        }
      },
      {
        path: 'combo_type_edit',
        name: 'combo_type_edit',
        component: () => import('@/views/hospital/combo-type/combo_type_edit.vue'),
        hidden: true,
        meta: {
          title: '套餐类型管理',
          needLogin: true
        }
      },
      {
        path: 'medical_examination_index',
        name: 'medical_examination_index',
        component: () => import('@/views/hospital/medical-examination/medical_examination_index.vue'),
        hidden: true,
        meta: {
          title: '体检项目信息',
          needLogin: true
        }
      },
      {
        path: 'medical_examination_save',
        name: 'medical_examination_save',
        component: () => import('@/views/hospital/medical-examination/medical_examination_save.vue'),
        hidden: true,
        meta: {
          title: '体检项目信息',
          needLogin: true
        }
      },
      {
        path: 'medical_examination_edit',
        name: 'medical_examination_edit',
        component: () => import('@/views/hospital/medical-examination/medical_examination_edit.vue'),
        hidden: true,
        meta: {
          title: '体检项目信息',
          needLogin: true
        }
      },
      {
        path: 'medical_combo_index',
        name: 'medical_combo_index',
        component: () => import('@/views/hospital/medical_combo/medical_combo_index.vue'),
        hidden: false,
        meta: {
          title: '体检套餐',
          needLogin: true
        }
      },
      {
        path: 'medical_combo_table',
        name: 'medical_combo_table',
        component: () => import('@/views/hospital/medical_combo/medical_combo_table.vue'),
        hidden: true,
        meta: {
          title: '体检套餐1',
          needLogin: true
        }
      },
      {
        path: 'medical_combo_save',
        name: 'medical_combo_save',
        component: () => import('@/views/hospital/medical_combo/medical_combo_save.vue'),
        hidden: true,
        meta: {
          title: '体检套餐1',
          needLogin: true
        }
      },
    ],
  },
  //系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/professional',
    meta: {
      title: '系统管理',
      icon: 'link',
      needLogin: true
    },
    children: [
      {
        path: 'professional_index',
        name: 'professional_index',
        component: () => import('@/views/system/professional/index'),
        meta: {
          title: '职称管理',
          needLogin: true
        }
      }, {
        path: 'professional_save',
        name: 'professional_save',
        hidden: true,
        component: () => import('@/views/system/professional/professional_save'),
        meta: {
          title: '新增图书',
          needLogin: true
        },
      },
      {
        path: 'professional_edit',
        name: 'professional_edit',
        hidden: true,
        component: () => import('@/views/system/professional/professional_edit'),
        meta: {
          title: '修改职称',
          needLogin: true
        },
      },
      {
        path: 'announcement_index',
        name: 'announcement_index',
        component: () => import('@/views/system/announcement/announcement_index.vue'),
        meta: {
          title: '消息公告',
          needLogin: true
        }
      },
      {
        path: 'announcement_save',
        name: 'announcement_save',
        component: () => import('@/views/system/announcement/announcement_save.vue'),
        meta: {
          title: '消息公告',
          needLogin: true
        },
        hidden: true
      },
      {
        path: 'announcement_edit',
        name: 'announcement_edit',
        component: () => import('@/views/system/announcement/announcement_edit.vue'),
        meta: {
          title: '消息公告',
          needLogin: true
        },
        hidden: true
      },
      {
        path: 'updatepwd',
        name: 'updatepwd',
        component: () => import('@/views/system/user/update_pwd.vue'),
        meta: {
          title: '修改密码',
          needLogin: true
        }
      },
      {
        path: 'administrators',
        name: 'administrators',
        component: () => import('@/views/system/administrators/administrators_index.vue'),
        meta: {
          title: '管理员管理',
          needLogin: true
        }
      },
      {
        path: 'administrators_save',
        name: 'administrators_save',
        component: () => import('@/views/system/administrators/administrators_save.vue'),
        meta: {
          title: '管理员管理',
          needLogin: true
        },
        hidden: true
      },
      {
        path: 'administrators_edit',
        name: 'administrators_edit',
        component: () => import('@/views/system/administrators/administrators_edit.vue'),
        meta: {
          title: '管理员管理',
          needLogin: true
        },
        hidden: true
      },
      {
        path: 'roles_info',
        name: 'roles_info',
        component: () => import('@/views/system/role/roles_index.vue'),
        meta: {
          title: '角色管理',
          needLogin: true
        }
      },
      {
        path: 'roles_save',
        name: 'roles_save',
        component: () => import('@/views/system/role/roles_save.vue'),
        meta: {
          needLogin: true
        },
        hidden: true
      },
      {
        path: 'roles_edit',
        name: 'roles_edit',
        component: () => import('@/views/system/role/roles_edit.vue'),
        meta: {
          needLogin: true
        },
        hidden: true
      },
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    meta: {
      needLogin: false
    }
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      needLogin: false
    }
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
