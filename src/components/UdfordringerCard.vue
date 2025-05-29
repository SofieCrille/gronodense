<template>
  <IonCard
    class="challenge-card"
    :class="{ 'active-card': active }"
    :style="cardStyles"
    @click="handleClick"
  >
    <IonCardContent class="card-content">
      <div class="text-group">
        <h2 class="title">{{ title }}</h2>
        <p class="subtitle">{{ daysLeft }} dage tilbage</p>
        <div class="footer">
          <IonIcon :icon="icon" />
          <span class="points">+{{ points }} pts</span>
        </div>
      </div>
      <IonButton
        class="action-button"
        fill="outline"
        @click.stop="handleClick"
      >
        {{ active ? 'Annuller' : buttonText }}
      </IonButton>
    </IonCardContent>
  </IonCard>
</template>

<script setup>
import { IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  daysLeft: { type: Number, required: true },
  points: { type: Number, required: true },
  icon: { type: [String, Object], required: true },
  bgColor: { type: String, default: '#fff' },
  textColor: { type: String, default: '#000' },
  active: { type: Boolean, default: false },
  buttonText: { type: String, default: 'Start' }
});

const router = useRouter();
function handleClick() {
  router.push({ name: 'ChallengeDetails', params: { id: props.id } });
}

const cardStyles = computed(() => ({
  backgroundColor: props.bgColor,
  color: props.textColor,
  borderRadius: '12px',
  border: props.active ? '2px solid black' : 'none',
  transition: 'transform 0.2s, border 0.2s',
  transform: props.active ? 'scale(1.05)' : 'none'
}));
</script>

<style scoped>
.challenge-card {
  margin: 0.5rem;
  width: 200px;
}
.challenge-card.active-card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
.footer {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
}
.points {
  font-weight: 600;
}
.action-button {
  margin-top: 0.5rem;
  --border-radius: 20px;
  --color: var(--ion-color-primary);
}
</style>
