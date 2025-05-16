<template>
  <IonPage>
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/vue';

import {
  home, homeOutline,
  gift, giftOutline,
  podium, podiumOutline,
  person, personOutline
} from 'ionicons/icons';

const route = useRoute();

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
