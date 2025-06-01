<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Pointshop</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen class="ion-padding no-pad">

      <!-- 0) Scroll-snap carousel above chips bar -->
      <div class="slideshow" ref="containerRef">
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
            :tags="item.tags"
            :category="item.category"
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
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

const slideImages = ['/img/grey.png', '/img/grey.png', '/img/grey.png'];
const slideRefs = ref([]);
const containerRef = ref(null);

let autoScrollInterval = null;

onMounted(() => {
  startAutoScroll();
});

onBeforeUnmount(() => {
  stopAutoScroll();
});

function startAutoScroll() {
  let currentIndex = 0;

  autoScrollInterval = setInterval(() => {
    const container = containerRef.value;
    const slides = slideRefs.value;

    if (!container || slides.length === 0) return;

    currentIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[currentIndex];

    container.scrollTo({
      left: nextSlide.offsetLeft,
      behavior: 'smooth'
    });
  }, 4000); // scroll every 4 seconds
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}

// categories and display names
const categories = ['trending', 'skonhed', 'mad', 'oplevelser','transport', 'konkurrencer', 'favoritter'];
const categoryNames = { trending: 'Trending', skonhed: 'Skønhed & mode', mad: 'Mad & drikke', oplevelser: 'Oplevelser',transport: 'Transport', konkurrencer: 'Kunkurrencer', favoritter: 'Favoritter' };
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


.slideshow {
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
  overflow-y: hidden;
}
.slideshow::-webkit-scrollbar {
  display: none;
}

.slides-container {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.slide-wrap {
  flex: 0 0 auto;
  max-width: 350px;
  width: 100%;
  scroll-snap-align: center;
}
.slide-image {
  max-width: 350px;
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

.chips-bar {
  display: flex;
  overflow-x: auto;
  padding: 0 20px 1rem;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}

.chips-bar > :first-child {
  margin-left: 0;
  scroll-margin-left: 20px;
}
.chips-bar::-webkit-scrollbar {
  display: none;
}
.chips-bar > * {
  flex-shrink: 0;
  scroll-snap-align: start;
}
.chips-bar ion-chip {
  --color: #02382C;
  border: 1px solid #DDDBD7 !important; /* full border declaration */
  font-weight: 600;
  font-size: 16px;
  height: 40px;
  border-radius: 50px;
}
.category-section {
  margin-bottom: 2rem;
}
.section-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.cards-scroll {
  display: flex;
  overflow-x: auto;
  overflow: visible;
  gap: 1rem;
  padding-right: 20px; /* right side spacing */
  scroll-snap-type: x mandatory;
  scroll-padding-left: 20px;
}

.cards-scroll > :first-child {
  scroll-margin-left: 20px; /* Key fix: Ensures first card always has 20px offset */
  margin-left: 20px; /* Additional explicit safeguard */
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
  margin-bottom: 1rem;
}



</style>