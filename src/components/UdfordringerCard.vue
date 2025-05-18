<script setup>
import {
  IonCard,
  IonCardContent,
  IonBadge,
  IonIcon
} from '@ionic/vue';
import { star } from 'ionicons/icons';

const props = defineProps({
  title: String,
  daysLeft: Number,
  points: Number,
  icon: { type: [String, Object], required: true },
  imageUrl: String,
  onActionClick: Function
});
</script>

<template>
  <IonCard class="ud-card" @click="props.onActionClick">
    <div
      class="ud-card-bg"
      :style="{ backgroundImage: `url(${props.imageUrl})`, backgroundColor: props.bgColor || '#C9E0DD' }"
    />
    <IonCardContent class="ud-content">
      <h2 class="ud-title">{{ props.title }}</h2>
      <p class="ud-subtitle">{{ props.daysLeft }} dage tilbage</p>
      <div class="ud-footer">
        <IonIcon :icon="props.icon" class="ud-icon" />
        <IonBadge class="ud-badge">+{{ props.points }} pts</IonBadge>
      </div>
    </IonCardContent>
  </IonCard>
</template>

<style scoped>
.ud-card {
  border-radius: 16px;
  overflow: hidden;
  min-width: 300px;
  margin-right: 1rem;
}
.ud-card-bg {
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  filter: brightness(0.6);
}
.ud-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  position: relative;
  top: -180px;
  color: #fff;
}
.ud-title {
  margin: 0;
  font-size: 1.5rem;
}
.ud-subtitle {
  margin: 0.5rem 0;
}
.ud-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ud-icon {
  font-size: 1.6rem;
  color: #fff;
}
.ud-badge {
  background: rgba(255,255,255,0.8);
  color: #000;
}
</style>
