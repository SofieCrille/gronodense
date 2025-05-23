<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <!-- Balance & notifications -->
        <IonButtons slot="start">
          <div class="header-balance">
            <IonIcon :icon="star" />
            <span>{{ balance }}</span>
          </div>
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
      <!-- Opgaver header & cards -->
      <div class="section-header">
        <h3 class="section-title">Opgaver</h3>
        <span class="challenge-count">{{ challengeCount }} opgaver</span>
      </div>
      <div class="card-grid" ref="grid" @scroll="onScroll">
        <ChallengeCard
          v-for="(task, i) in tasks"
          :key="task.id"
          :leftIcon="task.icon"
          :title="task.title"
          :description="task.description"
          :buttonText="task.buttonText"
          :bgColor="task.bgColor"
          :textColor="task.textColor"
          :points="task.points"
          :onActionClick="() => startTask(task.id)"
        />
      </div>
      <!-- Dots for tasks -->
      <ul class="dots">
        <li v-for="(_, i) in tasks" :key="i" :class="{ active: i === currentIndex }"></li>
      </ul>

      <div class="section-divider"></div>

      <!-- FAVORITTER carousel (no dots) -->
      <div v-if="favoriteItems.length" class="favorites-section">
        <div class="section-header">
          <h3 class="section-title">Favoritter</h3>
          <IonButton class="see-all" fill="clear" size="small" @click="goToFavoritesList">Se alle &rsaquo;</IonButton>
        </div>
        <div class="cards-scroll" ref="favGrid" @scroll="onFavScroll">
          <BelønningerCard
            v-for="item in favoriteItems"
            :key="item.id"
            :title="item.title"
            :vendor="item.vendor"
            :points="item.points"
            :image="item.image"
            :isFavorite="true"
            @select="openDetail(item.id)"
            @toggle-favorite="toggleFavorite(item.id)"
          />
        </div>
      </div>

      <div class="section-divider"></div>

      <!-- IGANGVÆRENDE UDFORDRINGER -->
      <div class="section-header">
        <h3 class="section-title">Udfordringer</h3>
        <IonButton class="see-all" fill="clear" size="small" @click="goToChallengesList">Se alle &rsaquo;</IonButton>
      </div>
      <div class="card-grid" ref="grid2" @scroll="onScroll2">
      </div>
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
import {
  star, notificationsOutline,
  bicycleOutline, trashOutline,
  bagOutline, radioOutline
} from 'ionicons/icons';

import ChallengeCard from '@/components/ChallengeCard.vue';
import UdfordringerCard from '@/components/UdfordringerCard.vue';
import BelønningerCard from '@/components/BelønningerCard.vue';

import { getFavorites, setFavorites, getBalance } from '@/firebaseRest.js';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { uid } = useAuth();

// -- Balance & Notifications --
const balance = ref(0);
onMounted(async () => {
  balance.value = await getBalance(uid.value);
});
function goToNotifications() {
  router.push({ name: 'Notifications' });
}

// -- Opgaver (Tasks) --
const tasks = ref([
  { id:'c1', title:'Bæredygtig transport', description:'Tag cyklen…', buttonText:'Begynd nu', icon:bicycleOutline, bgColor:'#C9E0DD', textColor:'#02382C', points:20 },
  { id:'c2', title:'Affaldssortering', description:'Lær hvordan…', buttonText:'Begynd nu', icon:trashOutline, bgColor:'#D2E3BC', textColor:'#02382C', points:20 },
  { id:'c3', title:'Besøg butik', description:'Besøg butik…', buttonText:'Begynd nu', icon:bagOutline, bgColor:'#E8CDC6', textColor:'#02382C', points:20 },
  { id:'c4', title:'Podcast', description:'Lyt til podcast…', buttonText:'Begynd nu', icon:radioOutline, bgColor:'#FFE0C6', textColor:'#02382C', points:20 }
]);
const challengeCount = computed(() => tasks.value.length);

// Scroll-snapping for tasks
const grid = ref(null), currentIndex = ref(0);
function onScroll() {
  const el = grid.value;
  if (!el || !el.children.length) return;
  const card = el.children[0];
  const gap = parseInt(getComputedStyle(el).gap) || 0;
  currentIndex.value = Math.round(el.scrollLeft / (card.offsetWidth + gap));
}
onMounted(onScroll);

// -- Favorites --
const rewards = [
  { id:1, title:'100 kr gavekort', vendor:'Odense Velvære', points:300, image:'img/odensevelvaere.jpg' },
  { id:2, title:'50 kr café-bon', vendor:'Café Aroma', points:150, image:'img/cafearoma.jpg' }
];
const favorites = ref([]);
onMounted(async () => {
  favorites.value = await getFavorites(uid.value) || [];
});
const favoriteItems = computed(() => rewards.filter(r => favorites.value.includes(r.id)));

async function toggleFavorite(id) {
  const idx = favorites.value.indexOf(id);
  idx >= 0 ? favorites.value.splice(idx, 1) : favorites.value.push(id);
  await setFavorites(uid.value, favorites.value);
}

// -- Favorites carousel scroll ---
const favGrid = ref(null);
function onFavScroll() {
  const el = favGrid.value;
  if (!el || !el.children.length) return;
}
onMounted(onFavScroll);

function goToFavoritesList() {
  router.push({ name: 'FavoritesList' });
}

function openDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } });
}

// -- Ongoing Challenges --
const ongoing = ref([
  { id:'u1', title:'Juni cykel udfordring', daysLeft:8, points:50, icon:bicycleOutline, bgColor:'#C9E0DD', textColor:'#02382C' }
]);
const grid2 = ref(null);
function onScroll2() {
  const el = grid2.value;
  if (!el || !el.children.length) return;
}
onMounted(onScroll2);

function viewDetails(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}

function goToChallengesList() {
  router.push({ name: 'ChallengesList' });
}

function startTask(id) {
  // existing logic
}
</script>

<style scoped>
.no-pad {
  --padding-start: 0 !important;
  --padding-end:   0 !important;
  overflow-y:      visible;
}

/* Scroll-snap containers */
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
.card-grid::-webkit-scrollbar,
.cards-scroll::-webkit-scrollbar {
  display: none;
}
.card-grid > *,
.cards-scroll > * {
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Pagination dots */
.dots {
  display: flex;
  justify-content: center;
  margin: 4px 0 16px;
  gap: 6px;
  padding: 0;
  list-style: none;
}
.dots li {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0,0,0,0.15);
  transition: background .2s, width .2s;
}
.dots li.active {
  width: 16px;
  border-radius: 4px;
  background: #02382C;
}

/* Section divider */
.section-divider {
  width: calc(100% - 40px);
  height: 1px;
  background: #DDDBD7;
  margin: 30px 20px;
}

.section-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 16px 0 0;
  margin-bottom: 20px;
}
.section-header .section-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.challenge-count {
  font-size: 12px;
  font-weight: 400;
}
.section-header IonButton {
  margin: 0 !important;
  padding: 0 !important;
}


.challenge-count {
  margin-left: auto;  /* <-- push it all the way right */
  font-size: 12px;
  font-weight: 400;
  color: #02382C;
}
</style>


