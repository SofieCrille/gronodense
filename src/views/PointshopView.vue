<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Pointshop</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen class="ion-padding">
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
          <IonButton fill="clear" size="small" @click="goToCategory(group.category)">
            Se alle &rsaquo;
          </IonButton>
        </div>
        <div class="cards-scroll">
          <IonCard
            v-for="item in group.items"
            :key="item.id"
            :routerLink="{ name: 'CategoryList', params: { category: group.category } }"
            routerDirection="forward"
            class="category-card"
          >
          <img :src="item.image" alt="" class="card-image" />
            <IonCardHeader class="card-header">
              <IonCardTitle>{{ item.title }}</IonCardTitle>
              <IonCardSubtitle>{{ item.vendor }}</IonCardSubtitle>
              <IonIcon
                :icon="favorites.includes(item.id) ? star : starOutline"
                class="favorite-icon"
                @click.stop="toggleFavorite(item.id)"
              />
            </IonCardHeader>
            <IonCardContent>
              <strong>{{ item.points }} pts</strong>
            </IonCardContent>
          </IonCard>
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
  IonChip, IonButton, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonIcon
} from '@ionic/vue';
import { image, star, starOutline } from 'ionicons/icons';
import { getFavorites, setFavorites } from '@/firebaseRest';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { uid } = useAuth();

//  -- your rewards data, each with a category key:
const rewards = [
  { id: 1, title: '50 kr rabat',           vendor: 'Butik Cirkel',     points: 200, category: 'trending', image: 'public/img/zirkel.webp' },
  { id: 2, title: '100 kr gavekort',       vendor: 'Odense Velvære',   points: 300, category: 'skonhed', image: 'public/img/odensevelvaere.jpg' },
  { id: 3, title: '30% mode & accessoirer',vendor: 'Modehuset',       points: 250, category: 'skonhed', image: 'public/img/modehuset.jpg' },
  { id: 4, title: '20 kr café-bon',        vendor: 'Café Aroma',       points: 150, category: 'mad', image: 'public/img/cafearoma.jpg' },
  { id: 5, title: 'Biografbillet',         vendor: 'Cinema City',      points: 220, category: 'oplevelser', image: 'public/img/cinemacity.jpg' },
  // …etc.
];

// which categories to show & labels
const categories = ['trending','skonhed','mad','oplevelser'];
const categoryNames = {
  trending:    'Trending',
  skonhed:     'Skønhed & mode',
  mad:         'Mad & drikke',
  oplevelser:  'Oplevelser'
};

// group the items by category
const groupedRewards = computed(() =>
  categories.map(cat => ({
    category: cat,
    items: rewards.filter(r => r.category === cat)
  }))
);

// favorites
const favorites = ref([]);
onMounted(async () => {
  try { favorites.value = await getFavorites(uid.value) }
  catch { favorites.value = [] }
});
async function toggleFavorite(id) {
  const idx = favorites.value.indexOf(id);
  if (idx >= 0) favorites.value.splice(idx,1);
  else favorites.value.push(id);
  await setFavorites(uid.value, favorites.value);
}

// navigation
function goToCategory(cat) {
  router.push({ name: 'CategoryList', params: { category: cat } });
}
</script>

<style scoped>
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
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}
.category-card {
  flex: 0 0 260px;
  min-width: 260px;
  border-radius: 12px;
  box-sizing: border-box;
}
.card-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin-bottom: 8px;
}
.card-header { position: relative; }
.favorite-icon {
  position: absolute;
  top: 8px; right: 8px;
  font-size: 1.4rem;
  color: var(--ion-color-primary);
  cursor: pointer;
}
</style>
