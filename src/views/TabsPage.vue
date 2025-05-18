<template>
  <IonPage>
    <!-- Global Header with Balance or Back Button -->
    <IonHeader>
      <IonToolbar>
        <!-- Left side: balance on main tabs, back on sub-pages -->
        <IonButtons slot="start">
          <template v-if="isMainTab">
            <IonButton>
              <IonIcon :icon="starOutline" aria-hidden="true" />
              <span>{{ balance }}</span>
            </IonButton>
          </template>
          <template v-else>
            <IonBackButton default-href="/tabs/hjem" />
          </template>
        </IonButtons>

        <IonTitle>GronOdense</IonTitle>

        <!-- Right side: empty on main, optional slot for actions -->
        <IonButtons slot="end">
          <!-- no balance here anymore -->
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonTabs>
      <IonRouterOutlet />

      <IonTabBar slot="bottom">
        <IonTabButton tab="hjem" href="/tabs/hjem">
          <IonIcon :icon="hjemIcon" aria-hidden="true" />
          <IonLabel>Hjem</IonLabel>
        </IonTabButton>

        <IonTabButton tab="shop" href="/tabs/shop">
          <IonIcon :icon="shopIcon" aria-hidden="true" />
          <IonLabel>Pointshop</IonLabel>
        </IonTabButton>

        <IonTabButton tab="udfordringer" href="/tabs/udfordringer">
          <IonIcon :icon="udfIcon" aria-hidden="true" />
          <IonLabel>Udfordringer</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profil" href="/tabs/profil">
          <IonIcon :icon="profilIcon" aria-hidden="true" />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonBackButton
} from '@ionic/vue';
import {
  home, homeOutline,
  gift, giftOutline,
  podium, podiumOutline,
  person, personOutline,
  starOutline
} from 'ionicons/icons';
import { getBalance } from '@/firebaseRest.js';
import { useAuth } from '@/composables/useAuth';

const route = useRoute();

// Determine active icons
const hjemIcon = computed(() =>
  route.path === '/tabs/hjem' ? home : homeOutline
);
const shopIcon = computed(() =>
  route.path === '/tabs/shop' ? gift : giftOutline
);
const udfIcon = computed(() =>
  route.path === '/tabs/udfordringer' ? podium : podiumOutline
);
const profilIcon = computed(() =>
  route.path === '/tabs/profil' ? person : personOutline
);

// Define main tab paths
const mainPaths = ['/tabs/hjem', '/tabs/shop', '/tabs/udfordringer', '/tabs/profil'];

// Computed to check if current route is one of the main tabs
const isMainTab = computed(() => mainPaths.includes(route.path));

// Balance state
const balance = ref(0);
const { uid } = useAuth();

// Fetch balance on mount
onMounted(async () => {
  try {
    balance.value = await getBalance(uid.value);
  } catch (e) {
    console.error('Failed to load balance', e);
  }
});
</script>

<style scoped>
/* Add any header-specific styling here */
</style>
