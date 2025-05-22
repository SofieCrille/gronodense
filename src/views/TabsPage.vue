<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <!-- Left: Balance pill -->
        <IonButtons slot="start">
          <template v-if="isMainTab">
            <div class="header-balance-pill">
              <!-- Replace star with coin icon -->
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

        <!-- Dynamic title -->
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
  starOutline, notificationsOutline,
  settingsOutline, arrowBackOutline
} from 'ionicons/icons';
import { getBalance } from '@/firebaseRest.js';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route  = useRoute();
const { uid } = useAuth();

// main tabs
const mainPaths = ['/tabs/hjem','/tabs/shop','/tabs/udfordringer','/tabs/profil'];
const currentTab = computed(() => route.path.split('/')[2] || 'hjem');
const isMainTab  = computed(() => mainPaths.includes(route.path));

// dynamic header title
const titles = { hjem: 'Hjem', shop: 'Pointshop', udfordringer: 'Udfordringer', profil: 'Profil' };
const pageTitle = computed(() => titles[currentTab.value] || 'GronOdense');

// icons
const homeIcon   = computed(() => currentTab.value==='hjem'?home:homeOutline);
const shopIcon   = computed(() => currentTab.value==='shop'?gift:giftOutline);
const udfIcon    = computed(() => currentTab.value==='udfordringer'?podium:podiumOutline);
const profilIcon = computed(() => currentTab.value==='profil'?person:personOutline);

const balance = ref(0);
onMounted(async()=>{ try { balance.value = await getBalance(uid.value); } catch { balance.value = 0; }});

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
  height:2.5rem;
}

/* coin icon sizing */
.coin-icon {
  width: 22px;
  height: 22px;
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

.header-notification-btn ion-icon {
  font-size: 1.5rem;
}

.notification-dot {
  position: absolute;
  top: 0.5rem; right: 0.5rem;
  width: 0.6rem; height: 0.6rem;
  background: #eb445a;
  border-radius: 50%;
}

ion-buttons[slot="start"] { margin-left: 1rem }
ion-buttons[slot="end"]   { margin-right: 1rem;
}
</style>
