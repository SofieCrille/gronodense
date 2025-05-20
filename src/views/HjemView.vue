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

    <!-- remove Ionic’s default horizontal padding -->
    <IonContent class="no-pad" style="background-color: #C9E0DD;">
      <h3 class="section-title">Opgaver</h3>

      <!-- scrollable snapping card row -->
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

      <!-- pagination dots -->
      <ul class="dots">
        <li
          v-for="(_, i) in tasks"
          :key="i"
          :class="{ active: i === currentIndex }"
        ></li>
      </ul>

      <!-- FAVORITTER & IGANGVÆRENDE (unchanged) -->
      <div v-if="favoriteItems.length" class="favorites-section">
        <h3>Favoritter</h3>
        <div class="favorites-bar">
          <IonCard
            v-for="item in favoriteItems"
            :key="item.id"
            button
            @click="openDetail(item.id)"
            class="favorite-card"
          >
            <img :src="item.image" alt="" class="card-image" />
            <IonCardHeader>
              <IonCardTitle>{{ item.title }}</IonCardTitle>
              <IonCardSubtitle>{{ item.vendor }}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent class="card-footer">
              <IonBadge color="primary">{{ item.points }} pts</IonBadge>
              <IonIcon
                :icon="star"
                class="favorite-icon"
                @click.stop="toggleFavorite(item.id)"
              />
            </IonCardContent>
          </IonCard>
        </div>
      </div>

      <h3 class="section-title">Igangværende udfordringer</h3>
      <div class="card-grid" ref="grid2" @scroll="onScroll2">
        <UdfordringerCard
          v-for="(u, i) in ongoing"
          :key="u.id"
          :title="u.title"
          :daysLeft="u.daysLeft"
          :points="u.points"
          :icon="u.icon"
          :buttonText="`+${u.points} pts`"
          :bgColor="u.bgColor"
          :textColor="u.textColor"
          @action="() => viewDetails(u.id)"
        />
      </div>
      <ul class="dots">
        <li
          v-for="(_, i) in ongoing"
          :key="i"
          :class="{ active: i === ongoingIndex }"
        ></li>
      </ul>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
} from '@ionic/vue';
import {
  star,
  notificationsOutline,
  bicycleOutline,
  trashOutline,
  bagOutline,
  radioOutline,
} from 'ionicons/icons';
import ChallengeCard from '@/components/ChallengeCard.vue';
import UdfordringerCard from '@/components/UdfordringerCard.vue';
import { getFavorites, setFavorites, getBalance } from '@/firebaseRest.js';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { uid } = useAuth();

// balance
const balance = ref(0);
onMounted(async () => {
  balance.value = await getBalance(uid.value);
});
function goToNotifications() {
  router.push({ name: 'Notifications' });
}

// tasks
const tasks = ref([
  { id: 'c1', title: 'Bæredygtig transport', description: 'Tag cyklen...', buttonText: 'Begynd nu', icon: bicycleOutline, bgColor: '#C9E0DD', textColor: '#02382C', points: 20 },
  { id: 'c2', title: 'Affalds sortering', description: 'Lær hvordan...', buttonText: 'Begynd nu', icon: trashOutline, bgColor: '#D2E3BC', textColor: '#02382C', points: 20 },
  { id: 'c3', title: 'Besøg butik', description: 'Besøg butik...', buttonText: 'Begynd nu', icon: bagOutline, bgColor: '#E8CDC6', textColor: '#02382C', points: 20 },
  { id: 'c4', title: 'Podcast', description: 'Lyt til podcasten…', buttonText: 'Begynd nu', icon: radioOutline, bgColor: '#FFE0C6', textColor: '#02382C', points: 20 },
]);
function startTask(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}

// favorites
const rewards = [
  { id: 1, title: '100 kr gavekort', vendor: 'Odense Velvære', points: 300, image: 'img/odensevelvaere.jpg' },
  { id: 2, title: '50 kr café-bon', vendor: 'Café Aroma', points: 150, image: 'img/cafearoma.jpg' }
];
const favorites = ref([]);
onMounted(async () => {
  try { favorites.value = await getFavorites(uid.value); }
  catch { favorites.value = []; }
});
const favoriteItems = computed(() => rewards.filter(r => favorites.value.includes(r.id)));
async function toggleFavorite(id) {
  const idx = favorites.value.indexOf(id);
  if (idx >= 0) favorites.value.splice(idx, 1);
  else favorites.value.push(id);
  await setFavorites(uid.value, favorites.value);
}
function openDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } });
}

// ongoing
const ongoing = ref([
  { id: 'u1', title: 'Juni cykel udfordring', daysLeft: 8, points: 50, icon: bicycleOutline, bgColor: '#C9E0DD', textColor: '#02382C' }
]);
function viewDetails(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}

// scroll‐dots logic for tasks
const grid = ref(null), currentIndex = ref(0);
function onScroll() {
  const el = grid.value; if (!el) return;
  const card = el.children[0], gap = parseInt(getComputedStyle(el).gap) || 0;
  const w = card.offsetWidth + gap;
  currentIndex.value = Math.round(el.scrollLeft / w);
}
onMounted(onScroll);

// scroll‐dots logic for ongoing
const grid2 = ref(null), ongoingIndex = ref(0);
function onScroll2() {
  const el = grid2.value; if (!el) return;
  const card = el.children[0], gap = parseInt(getComputedStyle(el).gap) || 0;
  const w = card.offsetWidth + gap;
  ongoingIndex.value = Math.round(el.scrollLeft / w);
}
onMounted(onScroll2);
</script>

<style scoped>
/* 1) Remove Ionic’s default horizontal gutter and allow vertical overflow */
.no-pad {
  --padding-start: 0 !important;
  --padding-end:   0 !important;
  overflow-y: visible;
}

/* 2) Scroll-snap container with inset & hidden scrollbars */
.card-grid {
  display: flex;
  overflow-x: auto;
  overflow-y: visible;            /* let shadows show below */
  padding-inline-start: 20px;
  padding-inline-end:   20px;
  padding-bottom:      16px;      /* room for drop-shadow */
  scroll-padding-inline-start: 20px;
  scroll-padding-inline-end:   20px;
  scroll-snap-type: x mandatory;
  gap: 20px;
  scrollbar-width: none;          /* Firefox */
}
.card-grid::-webkit-scrollbar {
  display: none;                  /* WebKit */
}
.card-grid > * {
  flex-shrink: 0;
  scroll-snap-align: start;
}

/* 3) Pagination dots (optional) */
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
  transition: background 0.2s, width 0.2s;
}

.dots li.active {
  width: 16px;               /* make it twice as wide */
  border-radius: 4px;        /* pill shape */
  background: #02382C;
}

/* …rest of your styles… */
</style>

