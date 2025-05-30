<template>
  <IonCard
    class="challenge-card"
    :style="cardStyles"
    @click="handleClick"
  >
    <!-- Front image layer (semi-transparent) -->
    <img
      v-if="bgImage"
      :src="bgImage"
      alt="challenge background"
      class="bg-image-front"
    />

    <IonCardContent class="card-content">
      <div class="text-group">
        <h2 class="title">{{ title }}</h2>
        <p class="subtitle">{{ daysLeft }} dage tilbage</p>
        <div class="points-bubble">
          <img src="/icons/coins.png" alt="coin" class="coin-image" />
          <span class="points-text">+{{ points }}</span>
        </div>
      </div>

      <div class="action-slot">
        <IonButton
          v-if="!active"
          class="action-button"
          fill="outline"
          @click.stop="handleClick"
        >
          {{ buttonText }}
        </IonButton>
        <div v-else class="progress-container">
          <svg viewBox="0 0 36 36" class="progress-circle">
            <path class="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle"
              :stroke-dasharray="`${progress}, 100`"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="18" class="percentage" text-anchor="middle" dominant-baseline="middle">
              {{ Math.round(progress) }}%
            </text>
          </svg>
        </div>
      </div>
    </IonCardContent>
  </IonCard>
</template>

<script setup>
import { IonCard, IonCardContent, IonButton } from '@ionic/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  daysLeft: { type: Number, required: true },
  points: { type: Number, required: true },
  icon: { type: [String, Object], required: false },
  bgColor: { type: String, default: '#fff' },
  textColor: { type: String, default: '#000' },
  active: { type: Boolean, default: false },
  buttonText: { type: String, default: 'Start' },
  progress: { type: Number, default: 0 },
  bgImage: { type: String, default: '' } // front image overlay
});

const router = useRouter();
function handleClick() {
  router.push({ name: 'ChallengeDetails', params: { id: props.id } });
}

const cardStyles = computed(() => ({
  backgroundColor: props.bgColor,
  color: props.textColor,
  borderRadius: '12px'
}));
</script>

<style scoped>
.challenge-card {
  position: relative;
  width: calc(100vw - 40px);
  max-width: 360px;
  height: 130px;
  margin: 0 auto;
  overflow: hidden;
}
.bg-image-front {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 15%; 
  z-index: 1;
}
.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
}
.text-group {
  flex: 1;
}
.title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.subtitle {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}
.points-bubble {
  display: inline-flex;
  align-items: center;
  background: var(--ion-color-light, #f0f0f0);
  border-radius: 8px;
  padding: 2px 4px;
  margin-top: 8px;
}
.coin-image {
  width: 15px;
  height: 15px;
  object-fit: contain;
  margin-right: 4px;
}
.points-text {
  font-size: 0.9rem;
  font-weight: 600;
}
.action-slot {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
}
.action-button {
  --border-radius: 20px;
  --color: var(--ion-color-primary);
}
.progress-container {
  width: 70px;
  height: 70px;
}
.progress-circle {
  width: 100%;
  height: 100%;
}
.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 4.5;
}
.circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 4.5;
  stroke-linecap: round;
  transition: stroke-dasharray 0.3s ease;
}
.percentage {
  font-size: 0.8em;
  font-weight: 600;
  fill: currentColor;
}
</style>
