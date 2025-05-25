<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <!-- Left: Balance pill or back button -->
        <IonButtons slot="start">
          <template v-if="isMainTab">
            <div class="header-balance-pill">
              <img src="/icons/coins.png" class="coin-icon" alt="balance" />
              <span>{{ balance }}</span>
            </div>
          </template>
          <template v-else>
            <IonButton fill="clear" @click="goBack">
              <IonIcon :icon="arrowBackOutline" />
            </IonButton>
          </template>
        </IonButtons>

        <!-- Dynamic title: also handles category list and favorites -->
        <IonTitle>{{ pageTitle }}</IonTitle>

        <!-- Right: Notification or Settings -->
        <IonButtons slot="end">
          <template v-if="isMainTab && currentTab !== 'profil'">
            <div class="header-notification-btn" @click="goToNotifications">
              <IonIcon :icon="notificationsOutline" />
              <span class="notification-dot"></span>
            </div>
          </template>
          <template v-else-if="isMainTab && currentTab === 'profil'">
            <IonButton fill="clear" @click="goToSettings">
              <IonIcon :icon="settingsOutline" />
            </IonButton>
          </template>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

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
  IonButtons, IonButton, IonIcon, IonTabs,
  IonRouterOutlet, IonTabBar, IonTabButton, IonLabel
} from '@ionic/vue';
import {
  homeOutline, home,
  giftOutline, gift,
  podiumOutline, podium,
  personOutline, person,
  notificationsOutline,
  settingsOutline, arrowBackOutline
} from 'ionicons/icons';
import { getBalance } from '@/firebaseRest.js';
import { useAuth } from '@/composables/useAuth';

// route info
const router = useRouter();
const route  = useRoute();

// define main tab paths
const mainTabs = ['hjem', 'shop', 'udfordringer', 'profil'];
const currentTab = computed(() => route.path.split('/')[2] || 'hjem');
const isMainTab  = computed(() => mainTabs.includes(currentTab.value) && route.name !== 'CategoryList');

// categoryNames for dynamic titles
const categoryNames = {
  trending:   'Trending',
  skonhed:    'Skønhed & mode',
  mad:        'Mad & drikke',
  oplevelser: 'Oplevelser',
  favorites:  'Favoritter'
};

// page titles for main routes
const baseTitles = {
  hjem: 'Hjem',
  shop: 'Pointshop',
  udfordringer: 'Udfordringer',
  profil: 'Profil'
};

// dynamic header title
const pageTitle = computed(() => {
  if (route.name === 'CategoryList') {
    const cat = route.params.category;
    return categoryNames[cat] || cat;
  }
  return baseTitles[currentTab.value] || 'GronOdense';
});

// icons for tabs
const homeIcon   = computed(() => currentTab.value==='hjem'?home:homeOutline);
const shopIcon   = computed(() => currentTab.value==='shop'?gift:giftOutline);
const udfIcon    = computed(() => currentTab.value==='udfordringer'?podium:podiumOutline);
const profilIcon = computed(() => currentTab.value==='profil'?person:personOutline);

// balance
const { uid } = useAuth();
const balance = ref(0);
onMounted(async ()=>{
  try { balance.value = await getBalance(uid.value); }
  catch { balance.value = 0; }
});

// navigation
function goToNotifications(){ router.push({ name:'Notifications' }); }
function goToSettings()     { router.push({ name:'Settings' }); }
function goBack()           { router.back(); }
</script>

<style scoped>
.header-balance-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid #DDDBD7;
  border-radius: 999px;
  font-weight: bold;
  color: var(--ion-color-primary);
  height: 2.5rem;
}
.coin-icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
}
.header-notification-btn {
  position: relative;
  width: 2.5rem; height: 2.5rem;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid #DDDBD7;
  border-radius: 50%;
  cursor: pointer;
}
.notification-dot {
  position: absolute;
  top: 0.5rem; right: 0.5rem;
  width: 0.6rem; height: 0.6rem;
  background: #eb445a;
  border-radius: 50%;
}
ion-buttons[slot="start"] { margin-left: 1rem }
ion-buttons[slot="end"]   { margin-right: 1rem }
</style>