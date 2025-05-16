<script setup>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/vue';

const props = defineProps({
  title: String,
  description: String,
  buttonText: String,
  leftIcon: Object,
  rightIcon: Object,
  onActionClick: Function,
  bgColor: { type: String, default: '#ffffff' },
  textColor: { type: String, default: '#000000' }
});
</script>

<template>
  <ion-card
    class="challenge-card"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <ion-card-header>
      <div class="icons-row">
        <ion-icon :icon="leftIcon" size="large" :style="{ color: textColor }" />
        <ion-icon :icon="rightIcon" size="large" :style="{ color: textColor }" />
      </div>
      <ion-card-title>{{ title }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <p>{{ description }}</p>

      <ion-button
        class="card-button"
        fill="outline"
        @click="onActionClick"
        :style="{
          '--color': textColor,
          '--border-color': textColor,
          '--border-radius': '12px',
          'box-shadow': 'none'
        }"
      >
        {{ buttonText }}
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
.challenge-card {
  width: 48%;
  margin: 1%;
  box-sizing: border-box;
}

.icons-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.card-button {
  width: 80%;
  font-weight: bold;
  margin-top: 12px;
  transition: all 0.3s ease;
  text-transform: none !important;
}

.card-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  filter: brightness(0.95);
}
</style>
