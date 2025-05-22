<template>
  <IonCard
    class="challenge-card"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <!-- Points bubble -->
    <div class="points-bubble">
      <img src="/icons/coins.png" class="coin-icon" alt="points" />
      <span>+{{ points }}</span>
    </div>

    <!-- Header -->
    <IonCardHeader class="card-header">
      <IonIcon class="main-icon" :icon="leftIcon" :style="{ color: textColor }" />
      <IonCardTitle class="card-title">{{ title }}</IonCardTitle>
    </IonCardHeader>

    <!-- Description -->
    <IonCardContent class="card-content">
      <p class="card-description">{{ description }}</p>
    </IonCardContent>

    <!-- Action button -->
    <IonButton
      class="card-button"
      fill="outline"
      @click="onActionClick"
      :style="{
        '--color': textColor,
        '--border-color': textColor,
        '--border-radius': '50px',
      }"
    >
      {{ buttonText }}
    </IonButton>
  </IonCard>
</template>

<script setup>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import { starOutline } from 'ionicons/icons';

const {
  title,
  description,
  buttonText,
  leftIcon,
  onActionClick,
  bgColor,
  textColor,
  points,
} = defineProps({
  title: String,
  description: String,
  buttonText: String,
  leftIcon: { type: [String, Object], required: true },
  onActionClick: Function,
  bgColor: { type: String, default: '#ffffff' },
  textColor: { type: String, default: '#000000' },
  points: { type: Number, required: true },
});
</script>

<style scoped>
.challenge-card {
  position: relative;
  width: 270px;
  height: 310px;
  padding: 0 10px;
  box-sizing: border-box;
  color: #02382C;
  border-radius: 15px;
  margin: 8px 0;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 6px rgba(0, 0, 0, 0.06),
    0 8px 12px rgba(0, 0, 0, 0.03);
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.main-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 16px;
}

.card-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 24px;
  margin: 0;
  color: #02382C;
}

.card-description {
  font-size: 14px;
  margin: 0;
  color: #02382C;
  width: 12rem;
}

.card-button {
  position: absolute;
  bottom: 16px;
  margin-left: 16px;
  text-transform: none !important;
  font-weight: 600;
  font-size: 16px;
  box-shadow: none;

  --color: #02382C;
  --border-color: #02382C;
  --border-radius: 50px;
}

.card-button:hover {
  background-color: rgba(2, 56, 44, 0.1);
}

.points-bubble {
  position: absolute;
  top: 16px;
  right: 16px;

  display: flex;
  align-items: center;
  gap: 4px;

  background: #ffffff;
  color: #02382C;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
}

.points-bubble ion-icon {
  font-size: 1rem;
}


/* Coin icon sizing */
.coin-icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
}
</style>
