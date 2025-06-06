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

const percent = computed(() => {
  return Math.round(progress.value * 100);
});

// When the user clicks anywhere on the card:
function handleCardClick() {
  router.push({
  name: 'TaskDetails',
  params: { id: props.id },
  query: { title: props.title }
});
}

const baseStyle = computed(() => ({
  backgroundColor: props.bgColor,
  color: props.textColor,
  border: '2px solid transparent'
}));

const miniCardStyle = {
  width: '270px',
  height: '100px',
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

<template>
  <IonCard
    class="challenge-card"
    :class="{ 'active-card': active, 'completed-card': completed }"
    :style="[ baseStyle, (active || completed) ? miniCardStyle : {} ]"
    @click="handleCardClick"
  >
    <!-- Acttive and completed kort -->
    <template v-if="active || completed">
      <!-- active state -->
      <template v-if="active">
        <div class="mini-layout">
          <div class="icon-title-row">
            <IonIcon :icon="leftIcon" class="mini-icon" />
            <div class="mini-title">{{ title }}</div>
            <div class="mini-points-bubble">
              <img src="/icons/coins.png" class="coin-icon-mini" alt="Points" />
              +{{ points }}
            </div>
          </div>
          <svg viewBox="0 0 36 36" class="circular-progress">
            <path
              class="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              class="circle"
              :stroke-dasharray="`${(progress * 100).toFixed(1)}, 100`"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text
              x="50%"
              y="50%"
              class="percentage-text"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {{ percent }}%
            </text>
          </svg>
        </div>
      </template>

      <template v-else>
        <div class="mini-layout">
          <div class="icon-title-row">
            <IonIcon :icon="leftIcon" class="mini-icon" />
            <div class="mini-title">{{ title }}</div>
            <div class="mini-points-bubble">
              <img src="/icons/coins.png" class="coin-icon-mini" alt="Points" />
              +{{ points }}
            </div>
          </div>
          <!-- Button takes the circle’s place -->
          <div class="mini-button-wrapper">
          <IonButton
            class="mini-button"
            @click.stop="onActionClick()"
            style="
              width: 140px;
              height: 60px;
            "
          >
            {{ buttonText }}
          </IonButton>
          </div>
        </div>
      </template>
    </template>

    <!-- default state -->
    <template v-else>
      <div class="points-bubble">
        <img src="/icons/coins.png" class="coin-icon" alt="points" />
        <span>+{{ points }}</span>
      </div>
      <IonCardHeader class="card-header">
        <IonIcon
          class="main-icon"
          :icon="leftIcon"
          :style="{ color: textColor }"
        />
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

.icon-title-row {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding-right: 10px;
  align-self: flex-start;
  
}

.mini-layout {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}


.mini-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: currentColor;
  margin-right: 8px;
}


.mini-title {
  font-size: 16px;
  font-weight: 600;
  color: currentColor;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.circular-progress {
  width: 70px;
  height: 70px;
  flex-shrink: 0;
}

.mini-button {
  padding: 0 12px;
  font-size: 14px;
  height: 36px;
}

.points-bubble-mini {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #ffffff;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
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
  transform-origin: center;
  transition: stroke-dasharray 0.5s ease;
}
.card-header {
 display: flex; 
 flex-direction: column; 
 align-items: flex-start;
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
  }

.card-content .card-description {
   font-size: 14px; 
   margin: 0; 
   width: 12rem; 
  }

.card-button {
   position: absolute; 
   bottom: 16px; 
   left: 16px; 
   text-transform: none!important; 
   font-weight: 600; 
   font-size: 16px; 
   box-shadow: none; 
  }

.card-button:hover {
   background-color: rgba(2, 56, 44, 0.1); 
  }

.points-bubble {
   position: absolute; 
   top: 16px; 
   right: 16px; 
   display: flex; 
   align-items: 
   center; 
   gap: 4px; 
   background: #ffffff; 
   padding: 4px 8px; 
   border-radius: 999px; 
   font-weight: 600; 
   font-size: 16px; 
  }

.coin-icon {
   width: 15px; 
   height: 15px; 
   object-fit: contain; 
  }

.mini-button {
  position: relative;
  overflow: hidden;
  /* keep any existing styles you had, e.g.: */
  --border-radius: 50px;
  margin-right: -10px;
  font-weight: 600;
  border-radius: 50px;
}
.percentage-text {
  font-size: 8px;
  fill: currentColor;
  font-weight: 600;
}

.mini-points-bubble {
  position: absolute;
  bottom: 16px;
  left: 16px;   
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 600;
  color: currentColor;
  z-index: 1;
}
.coin-icon-mini {
  width: 15px;
  height: 15px;
  margin-right: 4px;
}
</style>