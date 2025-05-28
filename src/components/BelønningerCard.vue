<template>
  <IonCard @click="handleSelect" class="belonninger-card">
    <!-- Image -->
    <div class="image-wrapper">
      <IonImg :src="image" class="card-image" />

      <!-- Tag badges -->
      <div class="tag-container">
        <span
          v-for="tag in tags"
          :key="tag"
          :class="['tag', tagClass(tag)]"
        >
          {{ tagLabel(tag) }}
        </span>
      </div>

      <!-- Points badge overlay -->
      <div class="points-badge">
        <img src="/icons/coins.png" class="coin-icon" alt="points" />
        <span>{{ points }}</span>
      </div>
    </div>

    <!-- Info -->
    <div class="info-section">
      <div class="header-row">
        <div class="left-group">
          <IonImg :src="logo" class="logo" />
          <div class="text-group">
            <div class="title">{{ title }}</div>
            <div class="vendor">{{ vendor }}</div>
          </div>
        </div>
        <IonButton fill="clear" class="favorite-button" @click.stop="handleToggleFavorite">
          <IonIcon
            :icon="isFavorite ? star : starOutline"
            class="star-icon"
            :class="{ favorited: isFavorite }"
          />
        </IonButton>
      </div>
    </div>
  </IonCard>
</template>

<script setup>
import { IonCard, IonImg, IonButton, IonIcon } from '@ionic/vue';
import { star, starOutline } from 'ionicons/icons';

// 1. Runtime-only prop definitions (no TS)
const props = defineProps({
  title:      { type: String,  required: true },
  vendor:     { type: String,  required: true },
  points:     { type: Number,  required: true },
  image:      { type: String,  required: true },
  logo:       { type: String,  required: true },
  isFavorite: { type: Boolean, default: false },
  category:   { type: String,  required: true },
  tags:       { type: Array,   default: () => [] }
});

// 2. Plain-JS emits
const emit = defineEmits(['select', 'toggle-favorite']);

function handleSelect() {
  emit('select');
}
function handleToggleFavorite() {
  emit('toggle-favorite');
}

function tagClass(tag) {
  return {
    ny:        'new',
    trending:  'trending',
    begrænset: 'limited'
  }[tag] || tag;
}
function tagLabel(tag) {
  return {
    ny:        'Ny',
    trending:  'Trending',
    begrænset: 'Begrænset'
  }[tag] || tag;
}
</script>

<style scoped>
/* …your styles stay exactly the same… */
</style>


<style scoped>
.belonninger-card {
  position: relative;
  width: 100%;
  margin: 0;
  height: 225px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
}

.card-image {
  width: 100%;
  height: 130px;
  object-fit: cover;
}

/* TAG STYLES */
.tag-container {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  line-height: 1;
}

.tag.new {
  background-color: #28A745;
}

.tag.trending {
  background-color: #FF6F00;
}

.tag.limited {
  background-color: #DC3545;
}

.points-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #ffffff;
  padding: 4px 8px;
  border-radius: 999px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #02382C;
}

.coin-icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
  margin-right: 4px;
}

.info-section {
  flex: 1;
  background: #fff;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}

.left-group {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 12px;
}

.text-group {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #02382C;
  line-height: 1;
}

.vendor {
  font-size: 12px;
  color: #858489;
  margin-top: 4px;
}

.favorite-button {
  --padding-top: 0;
  --padding-bottom: 0;
  --padding-start: 0;
  --padding-end: 0;
  margin-top: -6px;
}

@keyframes pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.star-icon {
  transition: color 0.3s, transform 0.3s;
}

.star-icon.favorited {
  animation: pop 0.4s ease-in-out;
  color: #ffcc00 !important;
}
</style>