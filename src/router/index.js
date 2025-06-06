// src/router/index.js
import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage              from '@/views/TabsPage.vue';
import HjemView              from '@/views/HjemView.vue';
import PointshopView         from '@/views/PointshopView.vue';
import ProductDetailView     from '@/views/ProductDetailView.vue';
import PurchaseView          from '@/views/PurchaseView.vue';
import CategoryListView      from '@/views/CategoryListView.vue';
import UdfordringerView      from '@/views/UdfordringerView.vue';
import ChallengeDetailsView  from '@/views/ChallengeDetailsView.vue';
import TaskDetailsView       from '@/views/TaskDetailsView.vue';
import ProfilView            from '@/views/ProfilView.vue';
import NotificationsView     from '@/views/NotificationsView.vue';
import SettingsView          from '@/views/SettingsView.vue';

const routes = [
  { path: '/', redirect: '/tabs/hjem' },

  {
    path: '/tabs',
    component: TabsPage,
    children: [
      { path: '',                redirect: '/tabs/hjem' },
      { path: 'hjem',            name: 'Hjem',           component: HjemView },
      { path: 'shop',            name: 'Shop',           component: PointshopView },

      {
        path: 'shop/:id',
        name: 'ProductDetail',
        component: ProductDetailView,
        props: true
      },
      {
        path: 'shop/:id/purchase',
        name: 'PurchaseView',
        component: PurchaseView,
        props: true
      },

      {
        path: 'shop/category/:category',
        name: 'CategoryList',
        component: CategoryListView,
        props: true
      },

      {
        path: 'task/:id',
        name: 'TaskDetails',
        component: TaskDetailsView,
        props: true
      },

      {
        path: 'udfordringer',
        name: 'UdfordringerView',
        component: UdfordringerView
      },
      {
        path: 'udfordringer/:id',
        name: 'ChallengeDetails',
        component: ChallengeDetailsView,
        props: true
      },

      {
        path: 'notifications',
        name: 'Notifications',
        component: NotificationsView
      },
      {
        path: 'profil',
        name: 'Profil',
        component: ProfilView
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsView
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  next();
});


export default router;
