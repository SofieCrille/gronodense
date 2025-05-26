<script setup>
import {
  IonCard,
  IonCardContent,
  IonBadge,
  IonIcon
} from '@ionic/vue';
import { star } from 'ionicons/icons';
import { computed } from 'vue';

const props = defineProps({
  title: String,
  daysLeft: Number,
  points: Number,
  icon: { type: [String, Object], required: true },
  imageUrl: String,
  kilometers: Number, 
  goal: { type: Number, default: 100 },
  onActionClick: Function
});

// compute percentage of goal achieved
const percent = computed(() => Math.min((props.kilometers / props.goal) * 100, 100));
// compute angle
const angle = computed(() => (percent.value / 100) * 360);
</script>

<template>
  <IonCard class="ud-card" @click="props.onActionClick">
    <div class="ud-card-bg" :style="{ backgroundImage: `url(${props.imageUrl})` }" />
    <IonCardContent class="ud-content">
      <div class="ud-text">
        <h2 class="ud-title">{{ props.title }}</h2>
        <p class="ud-subtitle">{{ props.daysLeft }} dage tilbage</p>
        <div class="ud-footer">
          <IonIcon :icon="props.icon" class="ud-icon" />
          <IonBadge class="ud-badge">+{{ props.points }} pts</IonBadge>
        </div>
      </div>
      <div class="ud-progress">
        <div class="circle">
          <div class="mask full" :style="{ transform: `rotate(${angle}deg)` }">
            <div class="fill" :style="{ transform: `rotate(${angle}deg)` }"></div>
          </div>
          <div class="mask half">
            <div class="fill" :style="{ transform: `rotate(${angle}deg)` }"></div>
          </div>
          <div class="inside-circle">
            {{ props.kilometers }}km
          </div>
        </div>
      </div>
    </IonCardContent>
  </IonCard>
</template>

<style scoped>
.ud-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  min-height: 200px;
  margin-right: 1rem;
}
.ud-card-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
}
.ud-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  color: #fff;
}
.ud-text {
  flex: 1;
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
  gap: 0.5rem;
}
.ud-icon {
  font-size: 1.6rem;
  color: #fff;
}
.ud-badge {
  background: rgba(255,255,255,0.8);
  color: #000;
}
.ud-progress {
  width: 80px;
  height: 80px;
  position: relative;
}
.circle {
  width: 100%;
  height: 100%;
  position: relative;
}
.mask,
.fill {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
}
.mask {
  clip: rect(0px, 80px, 80px, 40px);
}
.mask.full {
  clip: rect(0px, 40px, 80px, 0px);
}
.fill {
  background: #fff;
  clip: rect(0px, 40px, 80px, 0px);
}
.inside-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>