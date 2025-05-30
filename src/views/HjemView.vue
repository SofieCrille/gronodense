<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <div class="header-balance"><span>{{ balance }}</span></div>
        </IonButtons>
        <IonTitle>GronOdense</IonTitle>
        <IonButtons slot="end">
          <IonButton fill="clear" @click="goToNotifications">
            <IonIcon :icon="notificationsOutline" size="large" color="dark" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="no-pad" style="background-color: #C9E0DD;">
      <!-- Active & Completed Tasks -->
      <template v-if="activeAndCompleted.length">
        <div class="section-header">
          <h3 class="section-title">Dine opgaver</h3>
        </div>
        <div class="card-grid" ref="activeGrid">
          <OpgaverCard
            v-for="task in activeAndCompleted"
            :id="task.id"
            :key="task.id"
            :left-icon="icons[task.icon]"
            :title="task.title"
            :description="task.description"
            :bg-color="task.bgColor"
            :text-color="task.textColor"
            :points="task.points"
            :active="task.active"
            :completed="task.completed"
            :start-date="task.startDate"
            :deadline="task.deadline"
            :button-text="task.active ? 'I gang' : 'Hent belønning'"
            @action-click="onCardAction(task)"
          />
        </div>
      </template>

      <!-- Inactive Tasks -->
      <div class="section-header">
        <h3 class="section-title">Flere opgaver</h3>
        <span class="challenge-count">{{ inactiveTasks.length }} flere</span>
      </div>
      <div class="card-grid" ref="inactiveGrid" @scroll="onScrollInactive">
        <OpgaverCard
          v-for="task in inactiveTasks"
          :id="task.id"
          :key="task.id"
          :left-icon="icons[task.icon]"
          :title="task.title"
          :description="task.description"
          :bg-color="task.bgColor"
          :text-color="task.textColor"
          :points="task.points"
          :active="false"
          :completed="false"
          :button-text="'Start'"
          @action-click="onCardAction(task)"
        />
      </div>

      <!-- FAVORITTER carousel or empty state -->
      <div class="section-divider"></div>
      <div class="favorites-section">
        <div class="section-header">
          <h3 class="section-title">Favoritter</h3>
          <IonButton
            v-if="favoriteItems.length"
            class="see-all"
            fill="clear"
            size="small"
            @click="goToFavoritesList"
          >
            Se alle ›
          </IonButton>
        </div>
        <template v-if="favoriteItems.length">
          <div class="cards-scroll" ref="favGrid" @scroll="onFavScroll">
            <BelønningerCard
              v-for="item in favoriteItems"
              :key="item.id"
              :title="item.title"
              :vendor="item.vendor"
              :points="item.points"
              :image="item.image"
              :logo="item.logo"
              :is-favorite="favorites.includes(item.id)"
              @select="openDetail(item.id)"
              @toggle-favorite="toggleFavorite(item.id)"
            />
          </div>
        </template>
        <template v-else>
          <div class="empty-favorites-card">
            <IonIcon :icon="starOutline" size="large" color="medium" />
            <p>Tryk på stjerneikonet for at tilføje belønning til favoritter</p>
          </div>
        </template>
      </div>

      <!-- IGANGVÆRENDE UDFORDRINGER -->
      <template v-if="ongoing.length">
        <div class="section-divider"></div>
        <div class="section-header">
          <h3 class="section-title">Igangværende udfordringer</h3>
        </div>
        <div class="card-grid" ref="grid2" @scroll="onScroll2">
          <UdfordringerCard
            v-for="u in ongoing"
            :id="u.id"
            :key="u.id"
            :title="u.title"
            :days-left="u.daysLeft"
            :points="u.points"
            :icon="icons[u.icon]"
            :bg-color="u.bgColor"
            :text-color="u.textColor"
            :active="u.active"
            :bg-image="u.bgImage || ''"
            :button-text="u.active ? 'Annuller' : 'Start'"
            @action="() => toggleChallenge(u.id)"
            @click.native="viewDetails(u.id)"
          />
        </div>
      </template>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon
} from '@ionic/vue';
import { notificationsOutline, starOutline } from 'ionicons/icons';
import * as icons from 'ionicons/icons';

import OpgaverCard from '@/components/OpgaverCard.vue';
import UdfordringerCard from '@/components/UdfordringerCard.vue';
import BelønningerCard from '@/components/BelønningerCard.vue';
import rewards from '@/data/belonninger.json';

import { getBalance } from '@/firebaseRest.js';
import { useFavorites } from '@/composables/useFavorites';
import { useAuth } from '@/composables/useAuth';
import { useTasks } from '@/composables/useTasks';
import { useChallenges } from '@/composables/useChallenges';

const router = useRouter();
const { uid } = useAuth();
const { activeChallenges, challenges, startChallenge, cancelChallenge } = useChallenges(uid.value);
const ongoing = computed(() => activeChallenges.value);

const balance = ref(0);
onMounted(async () => {
  balance.value = await getBalance(uid.value);
});

function goToNotifications() {
  router.push({ name: 'Notifications' });
}

const { activeTasks, completedTasks, inactiveTasks, claimReward } = useTasks(uid.value);
const activeAndCompleted = computed(() => [...activeTasks.value, ...completedTasks.value]);

const inactiveGrid = ref(null);
function onScrollInactive() {}
const grid2 = ref(null);
function onScroll2() {}

async function onCardAction(task) {
  if (task.completed) {
    await claimReward(task.id);
    task.completed = false;
    activeTasks.value = [...activeTasks.value];
  } else {
    router.push({ name: 'TaskDetails', params: { id: task.id } });
  }
}

const { favorites, toggleFavorite } = useFavorites(uid.value);
const favoriteItems = computed(() => rewards.filter(r => favorites.value.includes(r.id)));
function goToFavoritesList() {
  router.push({ name: 'CategoryList', params: { category: 'favorites' } });
}
function openDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } });
}

function toggleChallenge(id) {
  const c = challenges.value.find(x => x.id === id);
  if (c.active) cancelChallenge(id);
  else startChallenge(id);
}

function viewDetails(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}
</script>

<style scoped>
.no-pad {
  --padding-start: 0 !important;
  --padding-end:   0 !important;
  overflow-y:      visible;
}
.card-grid,
.cards-scroll {
  display: flex;
  overflow-x: auto;
  overflow-y: visible;
  padding-inline: 20px;
  padding-bottom: 16px;
  scroll-padding-inline: 20px;
  scroll-snap-type: x mandatory;
  gap: 10px;
  scrollbar-width: none;
}
.card-grid > *,
.cards-scroll > * {
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
.section-divider {
  width: calc(100% - 40px);
  height: 1px;
  background: #DDDBD7;
  margin: 30px 20px;
}
.section-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 16px 0 0;
}
.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
.challenge-count {
  margin-left: auto;
  font-size: 12px;
  font-weight: 400;
  color: #02382C;
}
.see-all {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 16px;
  border: 1px solid #DDDBD7;
  background: var(--ion-background-color, #fff);
  color: #02382C;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
}
.empty-favorites-card {
  margin: 20px;
  padding: 40px;
  background: #eee;
  border-radius: 12px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
</style>
