// 引入官方元件
import { createRouter, createWebHistory } from 'vue-router';
import Vue from 'vue' 

// 引入自定義元件
import HelloWorld from '@/components/HelloWorld.vue'
import DeptAll from '@/components/DeptAll.vue'      
import DeptDetail from '@/components/DeptDetail.vue' 
import LatestAnn from '@/components/LatestAnn.vue'
import LogIn from '@/components/LogIn.vue'
import ApplyPaper from '@/components/ApplyPaper.vue'
import QandA from '@/components/QandA.vue'

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/DeptAll', component: DeptAll },
    { path: '/DeptDetail', component: DeptDetail },
    { path: '/DeptDetail/:id', component: DeptDetail },
    { path: '/LatestAnn', component: LatestAnn },
    { path: '/LogIn', component: LogIn },
    { path: '/ApplyPaper', component: ApplyPaper },
    { path: '/QandA', component: QandA },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;