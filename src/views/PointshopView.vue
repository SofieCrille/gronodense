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
            fill="clear" 
            size="small" 
            @click="goToCategory(group.category)"
          >
            Se alle &rsaquo;
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

// sample data
const rewards = [
  { id: 1, title: '50 kr rabat', vendor: 'Butik Cirkel',   points: 200, category: 'trending',   image: '/img/zirkel.webp' },
  { id: 2, title: '100 kr gavekort', vendor: 'Odense Velvære', points: 300, category: 'skonhed',    image: '/img/odensevelvaere.jpg' },
  // …
];

const categories = ['trending','skonhed','mad','oplevelser'];
const categoryNames = {
  trending:    'Trending',
  skonhed:     'Skønhed & mode',
  mad:         'Mad & drikke',
  oplevelser:  'Oplevelser'
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
  padding-bottom: 1rem;
}

.category-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.cards-scroll {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  scrollbar-width: none;
  overflow-y: visible;
  padding: 20px 20px 30px;
}
.cards-scroll::-webkit-scrollbar {
  display: none;
}
</style>
