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
