// src/router/index.js
import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage          from '@/views/TabsPage.vue';
import HjemView          from '@/views/HjemView.vue';
import PointshopView     from '@/views/PointshopView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import CategoryListView  from '@/views/CategoryListView.vue';
import UdfordringerView  from '@/views/UdfordringerView.vue';
import ChallengeDetails  from '@/views/ChallengeDetailsView.vue';
import ProfilView        from '@/views/ProfilView.vue';
import NotificationsView from '@/views/NotificationsView.vue';
import SettingsView      from '@/views/SettingsView.vue';

const routes = [
  { path: '/', redirect: '/tabs/hjem' },

  // Tabs container
  {
    path: '/tabs',
    component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/hjem' },
      { path: 'hjem',   component: HjemView },
      { path: 'shop',   component: PointshopView },
      {
        path: 'shop/:id',
        name: 'ProductDetail',
        component: ProductDetailView,
        props: true
      },
      {
        path: 'shop/category/:category',
        name: 'CategoryList',
        component: CategoryListView,
        props: true
      },
      {
        path: 'challenge/:id',
        name: 'ChallengeDetails',
        component: ChallengeDetails,
        props: true
      },
      { path: 'udfordringer', component: UdfordringerView },

      // moved inside tabs so header back button works correctly
      {
        path: 'notifications',
        name: 'Notifications',
        component: NotificationsView
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsView
      },

      { path: 'profil', component: ProfilView }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
