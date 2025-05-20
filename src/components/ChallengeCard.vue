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
  <IonCardHeader class="card-header">
  <IonIcon
    class="main-icon"
    :icon="leftIcon"
    size="large"
    :style="{ color: textColor }"
  />
  <IonCardTitle>{{ title }}</IonCardTitle>
</IonCardHeader>

    <IonCardContent>
      <p>{{ description }}</p>
      <IonButton
        class="card-button"
        fill="outline"
        @click="onActionClick"
      >
        {{ buttonText }}
      </IonButton>
    </IonCardContent>
  </IonCard>
</template>

<style scoped>

.challenge-card {
  min-width: 270px;
  min-height: 280px;
  box-sizing: border-box;

  /* theme color */
  color: #02382C;
}

.card-header {
  display: flex;
  flex-direction: column;
}

.main-icon {

  width: 3rem;
  height: 3rem;
}

.card-header ion-card-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #02382C;
}

/* ensure IonIcons inherit properly */
.challenge-card ion-icon {
  color: #02382C !important;
}

/* action button */
.card-button {
  width: 130px;
  margin: 12px auto 0;
  font-weight: bold;
  transition: all 0.3s ease;
  --color: #02382C;
  --border-color: #02382C;
  --border-radius: 50px;
  box-shadow: none;
}

.card-button:hover {
  background-color: rgba(2, 56, 44, 0.1);
}

.card-description {
  font-size: 20px;
}


</style>

