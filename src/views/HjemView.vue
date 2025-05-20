<template>
  <IonPage>
    <!-- Header with balance and notifications -->
    <IonHeader>
      <IonToolbar>
        <!-- Balance on left -->
        <IonButtons slot="start">
          <div class="header-balance">
            <IonIcon :icon="star" />
            <span>{{ balance }}</span>
          </div>
        </IonButtons>

        <IonTitle>GronOdense</IonTitle>

        <!-- Notification bell on right -->
        <IonButtons slot="end">
          <IonButton fill="clear" class="header-icon" @click="goToNotifications">
  <IonIcon :icon="notificationsOutline" size="large" color="dark" />
</IonButton>

        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding" style="background-color: #C9E0DD;">
      <!-- OPGAVER SECTION -->
      <h3 class="section-title">Opgaver</h3>
      <div class="card-grid">
        <ChallengeCard
          v-for="task in tasks"
          :leftIcon="task.icon"
          :key="task.id"
          :title="task.title"
          :description="task.description"
          :buttonText="task.buttonText"
          :bgColor="task.bgColor"
          :textColor="task.textColor"
          :onActionClick="() => startTask(task.id)"
        />
      </div>

      <!-- FAVORITTER SECTION -->
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

      <!-- IGANGVÆRENDE UDFORDRINGER -->
      <h3 class="section-title">Igangværende udfordringer</h3>
      <div class="card-grid">
        <UdfordringerCard
          v-for="u in ongoing"
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
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonBadge
} from '@ionic/vue';
import { star, notificationsOutline, bicycleOutline, trashOutline } from 'ionicons/icons';
import ChallengeCard from '@/components/ChallengeCard.vue';
import UdfordringerCard from '@/components/UdfordringerCard.vue';
import { getFavorites, setFavorites } from '@/firebaseRest.js';
import { getBalance } from '@/firebaseRest.js';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { uid } = useAuth();

// current balance
const balance = ref(0);
onMounted(async () => {
  balance.value = await getBalance(uid.value);
});

// navigate to notifications
function goToNotifications() {
  router.push({ name: 'Notifications' });
}

// 1) Tasks
const tasks = ref([
  { id: 'c1', title: 'Bæredygtig transport', description: 'Tag cyklen eller offentlig transport, fx. til eller fra uddanelse/arbejde. ', buttonText: 'Begynd nu', icon: bicycleOutline, bgColor: '#C9E0DD', textColor: '#02382C' },
  { id: 'c2', title: 'Affalds sortering', description: 'Lær hvordan du skralder korrekt med vores søgemaskine og scanner', buttonText: 'Begynd nu', icon: trashOutline, bgColor: '#D2E3BC', textColor: '#02382C' }
]);
function startTask(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}

// 2) Favorites
const rewards = [
  { id: 1, title: '100 kr gavekort', vendor: 'Odense Velvære', points: 300, image: 'img/odensevelvaere.jpg' },
  { id: 2, title: '50 kr café-bon', vendor: 'Café Aroma', points: 150, image: 'img/cafearoma.jpg' }
];
const favorites = ref([]);
onMounted(async () => {
  try {
    favorites.value = await getFavorites(uid.value);
  } catch {
    favorites.value = [];
  }
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

// 3) Ongoing udfordringer
const ongoing = ref([
  { id: 'u1', title: 'Juni cykel udfordring', daysLeft: 8, points: 50, icon: bicycleOutline, bgColor: '#C9E0DD', textColor: '#02382C' }
]);
function viewDetails(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}
</script>

<style scoped>
.card-grid { display: flex; overflow-x: auto; padding-bottom: 1rem; }
.favorites-section { margin: 2rem 0; }
.favorites-bar { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.5rem; }
.favorite-card { flex: 0 0 260px; min-width: 260px; border-radius: 12px; }
.card-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin-bottom: 8px;
}
.card-footer { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; }
.favorite-icon { font-size: 1.4rem; cursor: pointer; color: var(--ion-color-primary); }
.header-balance { display: flex; align-items: center; gap: 0.25rem; color: var(--ion-color-primary); font-weight: bold; }

.header-icon {
  margin-right: 4px;
}

</style>

