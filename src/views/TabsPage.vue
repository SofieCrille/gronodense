<template>
  <IonPage>
    <!-- Global Header -->
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <template v-if="isMainTab">
            <!-- show balance on main tabs -->
            <IonButton fill="clear" class="header-balance">
              <IonIcon :icon="starOutline" />
              <span>{{ balance }}</span>
            </IonButton>
          </template>
          <template v-else>
            <!-- show back button on sub-pages -->
            <IonBackButton defaultHref="/tabs/hjem" />
          </template>
        </IonButtons>

        <!-- dynamic title based on route -->
        <IonTitle>{{ pageTitle }}</IonTitle>

        <IonButtons slot="end">
          <template v-if="isMainTab && currentTab !== 'profil'">
            <!-- notifications on main tabs except Profile -->
            <IonButton fill="clear" @click="goToNotifications">
              <IonIcon :icon="notificationsOutline" />
            </IonButton>
          </template>
          <template v-if="isMainTab && currentTab === 'profil'">
            <!-- settings only on Profile tab -->
            <IonButton fill="clear" @click="goToSettings">
              <IonIcon :icon="settingsOutline" />
            </IonButton>
          </template>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <!-- Tabs & Routes -->
    <IonTabs>
      <IonRouterOutlet />
      <IonTabBar slot="bottom">
        <IonTabButton tab="hjem" href="/tabs/hjem">
          <IonIcon :icon="homeIcon" />
          <IonLabel>Hjem</IonLabel>
        </IonTabButton>
        <IonTabButton tab="shop" href="/tabs/shop">
          <IonIcon :icon="shopIcon" />
          <IonLabel>Pointshop</IonLabel>
        </IonTabButton>
        <IonTabButton tab="udfordringer" href="/tabs/udfordringer">
          <IonIcon :icon="udfIcon" />
          <IonLabel>Udfordringer</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profil" href="/tabs/profil">
          <IonIcon :icon="profilIcon" />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonIcon, IonBackButton,
  IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel
} from '@ionic/vue';
import {
  homeOutline, home,
  giftOutline, gift,
  podiumOutline, podium,
  personOutline, person,
  starOutline, notificationsOutline, settingsOutline,
  arrowBackOutline
} from 'ionicons/icons';
import { getBalance } from '@/firebaseRest.js';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route  = useRoute();
const { uid } = useAuth();

// define which paths are your four root tabs
const mainPaths = ['/tabs/hjem', '/tabs/shop', '/tabs/udfordringer', '/tabs/profil'];

// current “tab” segment
const currentTab = computed(() => route.path.split('/')[2] || 'hjem');
// whether we’re on one of those root tabs
const isMainTab  = computed(() => mainPaths.includes(route.path));

// dynamic page title
const pageTitle = computed(() => {
  if (route.name === 'Notifications') return 'Notifikationer';
  if (route.name === 'Settings')      return 'Indstillinger';
  switch (currentTab.value) {
    case 'hjem':         return 'Hjem';
    case 'shop':         return 'Pointshop';
    case 'udfordringer': return 'Udfordringer';
    case 'profil':       return 'Profil';
    default:             return 'GronOdense';
  }
});

// pick filled vs outline icons
const homeIcon   = computed(() => currentTab.value === 'hjem'         ? home    : homeOutline);
const shopIcon   = computed(() => currentTab.value === 'shop'         ? gift    : giftOutline);
const udfIcon    = computed(() => currentTab.value === 'udfordringer' ? podium  : podiumOutline);
const profilIcon = computed(() => currentTab.value === 'profil'       ? person  : personOutline);

// balance state
const balance = ref(0);
onMounted(async () => {
  try {
    balance.value = await getBalance(uid.value);
  } catch {
    balance.value = 0;
  }
});

// navigation actions
function goToNotifications() {
  router.push({ name: 'Notifications' });
}
function goToSettings() {
  router.push({ name: 'Settings' });
}
function goBack() {
  router.back();
}
</script>

<style scoped>
.header-balance {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--ion-color-primary);
}
</style>
