<script setup>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/vue';

const {
  title,
  description,
  buttonText,
  leftIcon,
  rightIcon,
  onActionClick,
  bgColor,
  textColor
} = defineProps({
  title: String,
  description: String,
  buttonText: String,
  leftIcon: {
    type: [String, Object],
    required: true
  },
  onActionClick: Function,
  bgColor: { type: String, default: '#ffffff' },
  textColor: { type: String, default: '#000000' }
});
</script>

<template>
  <IonCard
    class="challenge-card"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <IonCardHeader>
      <div class="icons-row">
        <IonIcon :icon="leftIcon" size="large" :style="{ color: textColor }" />
      </div>
      <IonCardTitle>{{ title }}</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <p>{{ description }}</p>
      <IonButton
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
      </IonButton>
    </IonCardContent>
  </IonCard>
</template>

<style scoped>
.challenge-card {
  flex: 0 0 48%;
  max-width: 48%;
  min-width: 255px;
  box-sizing: border-box;
}
.icons-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.challenge-card {
  flex: 0 0 48%;
  max-width: 48%;
  min-width: 255px;
  min-height: 280px;
  box-sizing: border-box;
}

.icons-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
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
