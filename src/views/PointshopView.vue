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
            :logo="item.logo"
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
import rewards from '@/data/belonninger.json';

// categories and display names
const categories = ['trending','skonhed','mad','oplevelser'];
const categoryNames = {
  trending:   'Trending',
  skonhed:    'Skønhed & mode',
  mad:        'Mad & drikke',
  oplevelser: 'Oplevelser'
};

// group rewards by category
const groupedRewards = computed(() =>
  categories.map(cat => ({
    category: cat,
    items: rewards.filter(r => r.category === cat)
  }))
);

const router = useRouter();
const { uid } = useAuth();
const favorites = ref([]);

// load user favorites
onMounted(async () => {
  try {
    favorites.value = await getFavorites(uid.value) || [];
  } catch {
    favorites.value = [];
  }
});

// toggle and persist favorite state
async function toggleFavorite(id) {
  const idx = favorites.value.indexOf(id);
  if (idx >= 0) favorites.value.splice(idx, 1);
  else favorites.value.push(id);
  await setFavorites(uid.value, favorites.value);
}

// navigate to category list or product detail
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
  padding: 0 20px 1rem;        /* 20px inset on left/right */
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}
.chips-bar::-webkit-scrollbar { display: none; }
.chips-bar > * {
  flex-shrink: 0;
  scroll-snap-align: start;
}
.chips-bar ion-chip {
  --outline-color: #DDDBD7;
  --color: #02382C;
  font-weight: 600;
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
  padding: 0 20px 30px;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}
.cards-scroll::-webkit-scrollbar { display: none; }
.cards-scroll > * {
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
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
</style>