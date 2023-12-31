import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例
// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式: createWebHistory 地址栏不带 #
// 2. hash模式: createWebHashHistory 地址栏带 #
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      // component 路由懒加载
      component: () => import('@/views/login/LoginPage.vue') // 登录页
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      // redirect 重定向
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

export default router
