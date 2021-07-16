import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/userinfo/:username',
    name: 'Userinfo',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Userinfo.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import(/* webpackChunkName: "Articles" */ '../views/Articles.vue')
  },
  {
    path: '/ArticleType',
    name: 'ArticleType',
    component: () => import(/* webpackChunkName: "ArticleType" */ '../views/ArticleType.vue')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "Article" */ '../views/Article.vue')
  },
  {
    path: '/mail',
    name: 'Mails',
    component: () => import(/* webpackChunkName: "Mails" */ '../views/Mails.vue')
  },
  {
    path: '/mailGet/:id',
    name: 'Mail',
    component: () => import(/* webpackChunkName: "Mail" */ '../views/Mail.vue')
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import(/* webpackChunkName: "Collection" */ '../views/Collection.vue')
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/admin/Admin.vue'),
    children: [
      {
        path: 'article',
        component: () => import(/* webpackChunkName: "WriteArticle" */ '../views/admin/WriteArticle.vue')
      },
      {
        path: 'articles',
        component: () => import(/* webpackChunkName: "AdminArticles" */ '../views/admin/AdminArticles.vue')
      },
      {
        path: 'users',
        component: () => import(/* webpackChunkName: "AdminUsers" */ '../views/admin/AdminUsers.vue')
      },
    ]
  },
  {
    path: '*',
    redirect: { name: 'Index' }
  },

]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
