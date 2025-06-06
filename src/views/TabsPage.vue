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
            <div class="header-back-btn" @click="goBack">
              <!-- Custom chevron SVG with thinner stroke -->
              <svg
                width="24"
                height="24"
                viewBox="0 0 512 512"
                fill="none"
                stroke="currentColor"
                stroke-width="35"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M328 112 L184 256 L328 400" />
              </svg>
            </div>
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
            <div class="header-settings-btn" @click="goToSettings">
  <IonIcon :icon="settingsOutline" />
</div>
          </template>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonTabs>
      <IonRouterOutlet />
      <IonTabBar slot="bottom" v-if="isMainTab">
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
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
  IonLabel
} from '@ionic/vue';
import {
  homeOutline,
  home,
  giftOutline,
  gift,
  podiumOutline,
  podium,
  personOutline,
  person,
  notificationsOutline,
  settingsOutline
} from 'ionicons/icons';

import { useAuth } from '@/composables/useAuth';
import { database } from '@/firebase';               // ← Import the DB you just exported
import { ref as dbRef, onValue, off } from 'firebase/database'; // ← Database SDK functions

// router & route
const router = useRouter();
const route = useRoute();

// determine current tab key
const currentTab = computed(() => route.path.split('/')[2] || 'hjem');

// primary tabs where we show balance pill
const primaryTabs = ['hjem', 'shop', 'udfordringer', 'profil'];
// sub-pages where we want back button
const excludedPages = [
  'CategoryList',
  'ProductDetail',
  'Notifications',
  'Settings',
  'ChallengeDetails',
  'PurchaseView'
];
const isMainTab = computed(
  () =>
    primaryTabs.includes(currentTab.value) &&
    !excludedPages.includes(route.name)
);

// dynamic page titles
const categoryNames = {
  trending: 'Trending',
  skonhed: 'Skønhed & mode',
  mad: 'Mad & drikke',
  oplevelser: 'Oplevelser',
  favorites: 'Favoritter'
};
const baseTitles = {
  hjem: 'Hjem',
  shop: 'Pointshop',
  udfordringer: 'Udfordringer',
  profil: 'Profil'
};
const pageTitle = computed(() => {
  switch (route.name) {
    case 'CategoryList':
      return categoryNames[route.params.category] || route.params.category;
    case 'Notifications':
      return 'Notifikationer';
    case 'Settings':
      return 'Instillinger';
      case 'TaskDetails':
      return dynamicTaskTitle.value;
    default:
      return baseTitles[currentTab.value] || 'GronOdense';
  }
});

const dynamicTaskTitle = ref('Opgave');
watchEffect(() => {
  if (route.name === 'TaskDetails') {
    dynamicTaskTitle.value = route.query.title || 'Opgave';
  }
});

// tab icons
const homeIcon = computed(() =>
  currentTab.value === 'hjem' ? home : homeOutline
);
const shopIcon = computed(() =>
  currentTab.value === 'shop' ? gift : giftOutline
);
const udfIcon = computed(() =>
  currentTab.value === 'udfordringer' ? podium : podiumOutline
);
const profilIcon = computed(() =>
  currentTab.value === 'profil' ? person : personOutline
);

// ─── USER BALANCE (real-time) ─────────────────────────────────────
const { uid } = useAuth();
const balance = ref(0);

// We’ll keep references here so we can detach the listener later
let balanceRef = null;
let unsubscribeFn = null;

onMounted(() => {
  if (!uid.value) {
    balance.value = 0;
    return;
  }

  // 1) Create a Database reference to /users/{uid}/balance
  balanceRef = dbRef(database, `users/${uid.value}/balance`);

  // 2) Attach onValue listener
  unsubscribeFn = onValue(
    balanceRef,
    snapshot => {
      const val = snapshot.val();
      balance.value = typeof val === 'number' ? val : 0;
    },
    error => {
      console.error('Failed to listen for balance:', error);
      balance.value = 0;
    }
  );
});

onUnmounted(() => {
  // Detach the listener when this component unmounts
  if (balanceRef && unsubscribeFn) {
    off(balanceRef, 'value', unsubscribeFn);
  }
});

// navigation actions
function goBack() {
  router.back();
}
function goToNotifications() {
  router.push({ name: 'Notifications' });
}
function goToSettings() {
  router.push({ name: 'Settings' });
}
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
  width: 21px;
  height: 21px;
  object-fit: contain;
}
.header-notification-btn {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #DDDBD7;
  border-radius: 50%;
  cursor: pointer;
}
.header-notification-btn ion-icon {
  font-size: 1.5rem;
}

.header-settings-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #DDDBD7;
  border-radius: 50%;
  cursor: pointer;
}
.header-settings-btn ion-icon {
  font-size: 1.5rem;
  color: var(--ion-color-primary);
}
.notification-dot {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 0.6rem;
  height: 0.6rem;
  background: #eb445a;
  border-radius: 50%;
}
ion-buttons[slot="start"] {
  margin-left: 1rem;
}

.header-back-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #DDDBD7;
  border-radius: 50%;
  cursor: pointer;
}
/* Target the inner SVG path for stroke width */
.header-back-btn ion-icon::v-deep svg path {
  stroke-width: 1.5 !important;
}
/* adjust overall icon size if needed */
.header-back-btn ion-icon {
  font-size: 1.5rem;
  color: var(--ion-color-primary);
}
ion-buttons[slot="end"] {
  margin-right: 1rem;
}
</style>
