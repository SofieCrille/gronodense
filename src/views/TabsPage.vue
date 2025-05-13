<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="hjem" href="/tabs/hjem">
          <ion-icon :icon="hjemIcon" aria-hidden="true" />
          <ion-label>Hjem</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="shop" href="/tabs/shop">
          <ion-icon :icon="shopIcon" aria-hidden="true" />
          <ion-label>Pointshop</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="udfordringer" href="/tabs/udfordringer">
          <ion-icon :icon="udfIcon" aria-hidden="true" />
          <ion-label>Udfordringer</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profil" href="/tabs/profil">
          <ion-icon :icon="profilIcon" aria-hidden="true" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet
} from '@ionic/vue';

// import the filled & outline versions of each desired icon
import {
  home,
  homeOutline,
  gift,
  giftOutline,
  podium,
  podiumOutline,
  person,
  personOutline
} from 'ionicons/icons';

const route = useRoute();

// choose filled vs outline based on the current path
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
</script>
