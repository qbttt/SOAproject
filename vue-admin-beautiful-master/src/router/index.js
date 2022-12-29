/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import TryLayout from '@/layouts/TryLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
   {
    path: "/travelplan",
    component: Layout,
    redirect: "noRedirect",
    name: 'Travelplan',
    alwaysShow: true,
    meta: { title: '旅行规划', icon: "atlas", },
    children: [
      {
        path: "ticket",
        name: "Ticket",
        component: () => import("@/views/travelplan/ticket"),
        meta: {
          title: "车票",
          permissions: ["admin"],
        },
      },
      {
        path: "combo",
        name: "Combo",
        component: () => import("@/views/travelplan/combo"),
        meta: {
          title: "旅游套餐",
          permissions: ["admin"],
        },
      },
      {
        path: "search",
        name: "Search",
        component: () => import("@/views/travelplan/search"),
        meta: {
          title: "地点查询",
          permissions: ["admin"],
        },
      },
      {
        path: "accommodation",
        name: "Accommodation",
        component: () => import("@/views/travelplan/accommodation"),
        meta: {
          title: "酒店/民宿",
          permissions: ["admin"],
        },
      },
    ],
  }, 
  {
    path:'/traffic',
    component:Layout,
    redirect:'noredirect',
    name:'Traffic',
    alwaysShow:true,
    meta:{title:'出行',icon:'traffic-light'},
    children:[
      {
        path:'routeplan',
        name:'Routeplan',
        component:()=>import('@/views/traffic/routeplan'),
        meta:{
          title:'出行路线规划',
          permissions:['admin','editor'],
        }
      },
      {
        path:'weather',
        name:'Weather',
        component:()=>import('@/views/traffic/weather'),
        meta:{
          title:'出行天气预报',
          permissions:['admin','editor']
        }
      }
    ]
  },
  {
    path:'/guide',
    component:Layout,
    redirect:'noredirect',
    name:'Guide',
    alwaysShow:true,
    meta:{title:'旅行攻略',icon:'comment'},
    children:[
      {
        path:'travelguide',
        name:'Travevlguide',
        component:()=>import('@/views/guide/index'),
        meta:{
          title:'攻略文章',
          permissions:['admin','editor']
        },
      }
    ]
  },
 
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  }
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
