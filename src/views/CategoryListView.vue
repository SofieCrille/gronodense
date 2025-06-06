
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonContent
} from '@ionic/vue';
import BelønningerCard from '@/components/BelønningerCard.vue';
import rewards from '@/data/belonninger.json';
import { getFavorites, setFavorites } from '@/firebaseRest';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const props = defineProps({
  category: {
    type: String,
    required: true
  }
});
const categoryParam = props.category;

const categoryNames = {
  trending:   'Trending',
  skonhed:    'Skønhed & mode',
  mad:        'Mad & drikke',
  oplevelser: 'Oplevelser',
  favorites:  'Favoritter'
};

const { uid } = useAuth();
const favorites = ref([]);
onMounted(async () => {
  try {
    favorites.value = await getFavorites(uid.value) || [];
  } catch {
    favorites.value = [];
  }
});
async function toggleFavorite(id) {
  const idx = favorites.value.indexOf(id);
  if (idx >= 0) favorites.value.splice(idx, 1);
  else favorites.value.push(id);
  await setFavorites(uid.value, favorites.value);
}

const filteredRewards = computed(() => {
  if (categoryParam === 'favorites') {
    return rewards.filter(r => favorites.value.includes(r.id));
  }
  return rewards.filter(r => r.category === categoryParam);
});

const title = computed(() => categoryNames[categoryParam] || categoryParam);

function openItem(id) {
  router.push({ name: 'ProductDetail', params: { id } });
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/tabs/hjem" />
        </IonButtons>
        <IonTitle>{{ title }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen class="ion-padding no-pad">
      <div class="cards-vertical">
        <BelønningerCard
          v-for="item in filteredRewards"
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
    </IonContent>
  </IonPage>
</template>


<style scoped>
.no-pad {
  --padding-start: 0;
  --padding-end:   0;
}

.cards-vertical {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 20px 20px;
}
</style>