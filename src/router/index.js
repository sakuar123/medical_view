import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
  {
    path: '/',
    component: Layout,
    meta: {
      title: '后台管理',
      icon: 'table'
    }
  },
  //系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/professional',
    meta: {
      title: '系统管理',
      icon: 'link'
    },
    children: [{
      path: 'professional_index',
      name: 'professional_index',
      component: () => import('@/views/system/professional/index'),
      meta: {
        title: '职称管理',
      }
    }, {
      path: 'professional_save',
      name: 'professional_save',
      hidden: true,
      component: () => import('@/views/system/professional/professional_save'),
      meta: {
        title: '新增图书',
      },
    },
      {
        path: 'logo',
        name: 'logo',
        component: () => import('@/views/system/professional/index'),
        meta: {
          title: '查看logo',
        }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
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
