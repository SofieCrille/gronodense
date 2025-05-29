<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Pointshop</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen class="ion-padding no-pad">

      <!-- 0) Scroll-snap carousel above chips bar -->
      <div class="chips-slideshow" ref="containerRef">
        <div class="slides-container">
          <div
            v-for="(imgSrc, idx) in slideImages"
            :ref="el => slideRefs[idx] = el"
            :key="idx"
            class="slide-wrap"
          >
            <img :src="imgSrc" alt="slide image" class="slide-image" />
          </div>
        </div>
      </div>

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
            :category="item.category"
            :tags="item.tags"
            :is-favorite="favorites.includes(item.id)"
            @select="openItem(item.id)"
            @toggle-favorite="toggleFavorite(item.id)"
          />
        </div>
      </div>

    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonChip,
  IonButton
} from '@ionic/vue';
import { useAuth } from '@/composables/useAuth';
import { useFavorites } from '@/composables/useFavorites';
import BelønningerCard from '@/components/BelønningerCard.vue';
import rewards from '@/data/belonninger.json';

// slideshow images
const slideImages = ['/img/grey.png', '/img/grey.png', '/img/grey.png'];
const slideRefs = ref([]);

// categories and display names
const categories = ['trending', 'skonhed', 'mad', 'oplevelser'];
const categoryNames = { trending: 'Trending', skonhed: 'Skønhed & mode', mad: 'Mad & drikke', oplevelser: 'Oplevelser' };
const groupedRewards = computed(() =>
  categories.map(cat => ({ category: cat, items: rewards.filter(r => r.category === cat) }))
);

// auth & favorites composable
const router = useRouter();
const { uid } = useAuth();
const { favorites, toggleFavorite } = useFavorites(uid.value);

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
  --padding-end: 0;
}

/* Enable horizontal swipe snapping on mobile */
.chips-slideshow {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 1rem;
  padding: 0 20px;
  box-sizing: border-box;
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch; /* smooth scrolling on iOS */
  scroll-snap-type: x mandatory;
  scrollbar-width: none;            /* hide scrollbar Firefox */
  -ms-overflow-style: none;         /* hide scrollbar IE10+ */
}
.chips-slideshow::-webkit-scrollbar {
  display: none;
}

.slides-container {
  display: flex;
  gap: 10px;
}
.slide-wrap {
  flex: 0 0 calc(100%);
  scroll-snap-align: center;
}
.slide-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Buffer after last slide */
.slides-container::after {
  content: "";
  flex: 0 0 20px;
}

/* rest unchanged... */
.chips-bar {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.cards-scroll::-webkit-scrollbar {
  display: none;
}
.cards-scroll > * {
  flex-shrink: 0;
  scroll-snap-align: start;
}
.see-all {
  font-size: 12px;
}

.no-pad {
  --padding-start: 0;
  --padding-end:   0;
}

.section-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 0.5rem;
}
</style>