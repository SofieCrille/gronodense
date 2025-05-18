import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage          from '@/views/TabsPage.vue';
import HjemView          from '@/views/HjemView.vue';
import PointshopView     from '@/views/PointshopView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import UdfordringerView  from '@/views/UdfordringerView.vue';
import ProfilView        from '@/views/ProfilView.vue';
import ChallengeDetails from '@/views/ChallengeDetailsView.vue';
import CategoryList from '@/views/CategoryListView.vue';

const routes = [
  { path: '/', redirect: '/tabs/hjem' },
  {
    path: '/tabs',
    component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/hjem' },
      { path: 'hjem',        component: HjemView },
      { path: 'shop',        component: PointshopView },
      {
        path: 'shop/:id',
        name: 'ProductDetail',
        component: ProductDetailView,
        props: true
      },
      {
        path: 'challenge/:id',
        name: 'ChallengeDetails',
        component: ChallengeDetails,
        props: true
      },
      {
        path: 'shop/category/:category',
        name: 'CategoryList',
        component: CategoryList,
        props: true
      },
      { path: 'udfordringer', component: UdfordringerView },
      { path: 'profil',       component: ProfilView }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
