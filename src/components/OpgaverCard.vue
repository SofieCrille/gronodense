<template>
  <IonCard
    class="challenge-card"
    :class="{ 'active-card': active, 'completed-card': completed }"
    :style="[ baseStyle, (active || completed) ? miniCardStyle : {} ]"
    @click="handleCardClick"
  >
    <template v-if="active || completed">
      <div class="mini-layout">
        <svg v-if="active" viewBox="0 0 36 36" class="circular-progress">
          <path
            class="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle"
            :stroke-dasharray="`${(progress * 100).toFixed(1)}, 100`"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <IonButton
          v-if="completed"
          class="mini-button"
          fill="outline"
          @click.stop="onActionClick()"
        >
          {{ buttonText }}
        </IonButton>
        <div class="mini-title">{{ title }}</div>
        <IonIcon :icon="leftIcon" class="mini-icon" />
      </div>
    </template>

    <template v-else>
      <div class="points-bubble">
        <img src="/icons/coins.png" class="coin-icon" alt="points" />
        <span>+{{ points }}</span>
      </div>
      <IonCardHeader class="card-header">
        <IonIcon class="main-icon" :icon="leftIcon" :style="{ color: textColor }" />
        <IonCardTitle class="card-title">{{ title }}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent class="card-content">
        <p class="card-description">{{ description }}</p>
      </IonCardContent>
      <IonButton
        class="card-button"
        fill="outline"
        @click.stop="onActionClick()"
        :style="{
          '--color': textColor,
          '--border-color': textColor,
          '--border-radius': '50px'
        }"
      >
        {{ buttonText }}
      </IonButton>
    </template>
  </IonCard>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/vue';
import { computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
  leftIcon: { type: [String, Object], required: true },
  onActionClick: { type: Function, default: () => {} },
  bgColor: { type: String, default: '#ffffff' },
  textColor: { type: String, default: '#000000' },
  points: { type: Number, required: true },
  active: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  startDate: { type: String, default: null },
  deadline: { type: String, default: null }
});

const router = useRouter();

function handleCardClick() {
  if (props.completed) {
    router.push({ name: 'TaskDetails', params: { id: props.id } });
  } else {
    props.onActionClick();
  }
}

const baseStyle = computed(() => ({
  backgroundColor: props.bgColor,
  color: props.textColor,
  border: '2px solid transparent'
}));

const miniCardStyle = {
  width: '100%',
  height: '80px',
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 'none'
};

const progress = computed(() => {
  if (props.completed) return 1;
  if (!props.active || !props.startDate || !props.deadline) return 0;
  const start = new Date(props.startDate);
  const end = new Date(props.deadline);
  const now = new Date();
  if (now >= end) return 1;
  return (now - start) / (end - start);
});
</script>
<style scoped>
.challenge-card {
  position: relative;
  width: 270px;
  height: 310px;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 15px;
  margin: 8px 0;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 6px rgba(0, 0, 0, 0.06),
    0 8px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s, box-shadow 0.2s, border 0.2s;
}

/* Mini layout styles */
.mini-layout {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}
.circular-progress {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}
.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 2.8;
}
.circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
}
.points-bubble-mini {
  margin-right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #ffffff;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
}
.mini-title {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.mini-icon {
  font-size: 24px;
}

/* Rest of full card styles unchanged */
.card-header { display: flex; flex-direction: column; align-items: flex-start; }
.main-icon { width: 3rem; height: 3rem; margin-bottom: 16px; }
.card-title { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 24px; margin: 0; }
.card-content .card-description { font-size: 14px; margin: 0; width: 12rem; }
.card-button { position: absolute; bottom: 16px; left: 16px; text-transform: none !important; font-weight: 600; font-size: 16px; box-shadow: none; }
.card-button:hover { background-color: rgba(2, 56, 44, 0.1); }
.points-bubble { position: absolute; top: 16px; right: 16px; display: flex; align-items: center; gap: 4px; background: #ffffff; padding: 4px 8px; border-radius: 999px; font-weight: 600; font-size: 16px; }
.coin-icon { width: 15px; height: 15px; object-fit: contain; }
</style>
