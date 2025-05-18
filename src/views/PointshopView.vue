<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Point Shop</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen class="ion-padding">
      <!-- Category chips -->
      <div class="chip-bar">
        <IonChip
          :outline="!selectedCategory"
          :color="!selectedCategory ? 'primary' : 'light'"
          @click="selectedCategory = ''"
        >
          Alle
        </IonChip>

        <IonChip
          v-for="cat in categories"
          :key="cat"
          :outline="selectedCategory !== cat"
          :color="selectedCategory === cat ? 'primary' : 'light'"
          @click="selectedCategory = cat"
        >
          {{ categoryNames[cat] || cat }}
        </IonChip>
      </div>

      <IonGrid>
        <IonRow>
          <IonCol
            v-for="item in filteredRewards"
            :key="item.id"
            size="12" size-sm="6" size-md="4"
          >
            <IonCard button @click="openDetail(item.id)">
              <div class="placeholder-box" />

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
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard,
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonIcon, IonChip
} from '@ionic/vue';
import { star, starOutline } from 'ionicons/icons';
import { getFavorites, setFavorites } from '@/firebaseRest';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { uid } = useAuth();

// Example rewards with categories
const rewards = [
  { id: 1, title: '100 kr gavekort', vendor: 'Odense Velvære', points: 300, category: 'skønhed' },
  { id: 2, title: '50 kr café-bon',   vendor: 'Café Aroma',    points: 150, category: 'mad' },
  { id: 3, title: 'Biograftur',       vendor: 'Cinema City',  points: 200, category: 'oplevelser' },
  { id: 4, title: 'Konkurrence-entry',vendor: 'GivDigChancen', points: 100, category: 'konkurrencer' },
  // …etc
];

// friendly labels
const categoryNames = {
  skønhed:      'Skønhed',
  mad:          'Mad',
  oplevelser:   'Oplevelser',
  konkurrencer: 'Konkurrencer'
};

// derive unique categories
const categories = Array.from(new Set(rewards.map(r => r.category)));
// reactive selection
const selectedCategory = ref('');

// filtered rewards
const filteredRewards = computed(() => {
  if (!selectedCategory.value) return rewards;
  return rewards.filter(r => r.category === selectedCategory.value);
});

// favorites
const favorites = ref([]);
onMounted(async () => {
  try {
    favorites.value = await getFavorites(uid.value);
  } catch (e) {
    console.error('Failed to load favorites', e);
  }
});

// toggle favorite
async function toggleFavorite(id) {
  const idx = favorites.value.indexOf(id);
  if (idx >= 0) favorites.value.splice(idx, 1);
  else favorites.value.push(id);
  try {
    await setFavorites(uid.value, favorites.value);
  } catch (e) {
    console.error('Failed to save favorites', e);
    alert('Kunne ikke gemme favoritter');
  }
}

// navigate to detail
function openDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } });
}
</script>

<style scoped>
.chip-bar {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}
.chip-bar::-webkit-scrollbar {
  height: 6px;
}
.chip-bar::-webkit-scrollbar-thumb {
  background: var(--ion-color-medium);
  border-radius: 3px;
}
.placeholder-box {
  width: 100%;
  height: 150px;
  background-color: #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
}
.card-header {
  position: relative;
}
.favorite-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.4rem;
  color: var(--ion-color-primary);
  cursor: pointer;
}
</style>