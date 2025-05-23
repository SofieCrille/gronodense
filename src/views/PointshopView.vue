<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Pointshop</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen class="ion-padding no-pad">
      <!-- 1) Chips bar -->
      <div class="chips-bar">
        <IonChip
          v-for="cat in categories"
          :key="cat"
          outline
          @click="goToCategory(cat)"
        >
          {{ categoryNames[cat] }}
        </IonChip>
      </div>

      <!-- 2) All categories sections -->
      <div
        v-for="group in groupedRewards"
        :key="group.category"
        class="category-section"
      >
        <div class="section-header">
          <h3>{{ categoryNames[group.category] }}</h3>
          <IonButton
            class="see-all"
            fill="clear"
            size="small"
            @click="goToCategory(group.category)"
          >
            Se alle ›
          </IonButton>
        </div>
        <div class="cards-scroll">
          <BelønningerCard
            v-for="item in group.items"
            :key="item.id"
            :title="item.title"
            :vendor="item.vendor"
            :points="item.points"
            :image="item.image"
            :isFavorite="favorites.includes(item.id)"
            @select="openItem(item.id)"
            @toggle-favorite="toggleFavorite(item.id)"
          />
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonChip, IonButton
} from '@ionic/vue';
import { getFavorites, setFavorites } from '@/firebaseRest';
import { useAuth } from '@/composables/useAuth';
import BelønningerCard from '@/components/BelønningerCard.vue';

// static sample data with more rewards
const rewards = [
  { id: 1, title: '50 kr rabat', vendor: 'Butik Cirkel',      points: 200, category: 'trending',   image: '/img/zirkel.webp' },
  { id: 2, title: '100 kr gavekort', vendor: 'Odense Velvære',  points: 300, category: 'skonhed',    image: '/img/odensevelvaere.jpg' },
  { id: 3, title: 'Gratis kaffe', vendor: 'Café Aroma',        points: 150, category: 'mad',        image: '/img/cafearoma.jpg' },
  { id: 4, title: 'Biograftur', vendor: 'Film & Kino',        points: 400, category: 'oplevelser', image: '/img/cinema.jpg' },
  { id: 5, title: '20% tøjrabatte', vendor: 'Modehus DK',      points: 250, category: 'skonhed',    image: '/img/fashion.jpg' },
  { id: 6, title: 'Vin-smagning', vendor: 'Vinhuset',         points: 500, category: 'oplevelser', image: '/img/wine.jpg' },
  { id: 7, title: 'Brunch for 2', vendor: 'Brunch Café',      points: 350, category: 'mad',        image: '/img/brunch.jpg' },
  { id: 8, title: 'Spa-dag', vendor: 'Wellness Center',      points: 600, category: 'oplevelser', image: '/img/spa.jpg' },
  { id: 9, title: 'Nyhedsbrev', vendor: 'Bøger & Co',         points: 100, category: 'trending',   image: '/img/books.jpg' },
  { id:10, title: 'Fitnesspas', vendor: 'GymPlus',            points: 450, category: 'oplevelser', image: '/img/gym.jpg' },
  { id:11, title: 'Cocktail-event', vendor: 'Bar Central',     points: 550, category: 'oplevelser', image: '/img/cocktail.jpg' },
  { id:12, title: 'Salatbar fri', vendor: 'Veggie Corner',     points: 180, category: 'mad',        image: '/img/salad.jpg' }
];

const categories = ['trending','skonhed','mad','oplevelser'];
const categoryNames = {
  trending:   'Trending',
  skonhed:    'Skønhed & mode',
  mad:        'Mad & drikke',
  oplevelser: 'Oplevelser'
};

const groupedRewards = computed(() =>
  categories.map(cat => ({
    category: cat,
    items: rewards.filter(r => r.category === cat)
  }))
);

const router = useRouter();
const { uid } = useAuth();
const favorites = ref([]);

onMounted(async () => {
  try { favorites.value = await getFavorites(uid.value); }
  catch { favorites.value = []; }
});

async function toggleFavorite(id) {
  const idx = favorites.value.indexOf(id);
  if (idx >= 0) favorites.value.splice(idx,1);
  else favorites.value.push(id);
  await setFavorites(uid.value, favorites.value);
}

function goToCategory(cat) {
  router.push({ name: 'CategoryList', params: { category: cat } });
}
function openItem(id) {
  router.push({ name: 'ProductDetail', params: { id } });
}
</script>

<style scoped>
.no-pad {
  --padding-start: 0;
  --padding-end:   0;
}

.chips-bar {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  margin-left: 20px;
  padding: 0 20px 1rem;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}

.chips-bar::-webkit-scrollbar {
  display: none;
}
.chips-bar > * {
  flex-shrink: 0;
  scroll-snap-align: start;
  border: 1px solid #DDDBD7;
  Font-weight: 600; 
  color: #02382C;
}

.category-section {
  margin-bottom: 2rem;
}

.section-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 0.5rem;
}

.section-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.cards-scroll {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  scrollbar-width: none;
  overflow-y: visible;
  padding: 0 20px 30px;
  scroll-snap-type: x mandatory;  /* strict snapping like home view */
}
.cards-scroll::-webkit-scrollbar {
  display: none;
}
.cards-scroll > * {
  flex-shrink: 0;
  scroll-snap-align: start;      /* snap each card to start edge */
  scroll-snap-stop: always;      /* ensure it always stops */
}
.cards-scroll::-webkit-scrollbar {
  display: none;
}
.cards-scroll > * {
  flex-shrink: 0;
  scroll-snap-align: center;     /* snap to center, not start */
}

/* “Se alle” button positioning */
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
</style>
