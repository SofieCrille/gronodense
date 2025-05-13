import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '@/views/TabsPage.vue';
import HjemView from '@/views/HjemView.vue';
import PointshopView from '@/views/PointshopView.vue';
import UdfordringerView from '@/views/UdfordringerView.vue';  // corrected import
import ProfilView from '@/views/ProfilView.vue';

const routes = [
  { path: '/', redirect: '/tabs/hjem' },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/hjem' },
      { path: 'hjem', component: HjemView },
      { path: 'shop', component: PointshopView },
      { path: 'udfordringer', component: UdfordringerView },  // use corrected name
      { path: 'profil', component: ProfilView }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
