<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/tabs/hjem" />
        </IonButtons>
        <IonTitle>{{ task.title }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="no-pad">
      <section v-if="task.image" class="image-section">
        <img :src="task.image" alt="task-image" class="task-image" />
      </section>
      <div class="container">
        <section class="title-section">
          <h2>{{ task.title }}</h2>
          <p class="description">{{ task.description }}</p>
        </section>

        <h3>Fremskridt</h3>
        <section v-if="task.active || task.completed" class="progress">
  <div class="progress-row">
    <span class="progress-percent">{{ progressPercent }}%</span>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: animatedPercent + '%' }"></div>
    </div>
  </div>
</section>

        <section v-if="task.deadline" class="countdown">
          <div class="count-coins">
            <div class="timer">
              <span>{{ timeLeft.days }}d</span>
              <span>{{ timeLeft.hours }}h</span>
              <span>{{ timeLeft.minutes }}m</span>
              <span>{{ timeLeft.seconds }}s</span>
            </div>
            <div class="coins-container">
              <img src="/public/icons/coins.png" alt="coins">
            <p>+{{ task.points }} </p>
          </div>
          </div>
        </section>

        <section v-if="task.steps" class="steps">
          <h3>Hvad skal du gøre?</h3>
          <ul>
            <li v-for="(step, i) in task.steps" :key="i">{{ step }}</li>
          </ul>
        </section>

        <section v-if="task.active && !task.completed" class="verification">
  <IonButton
    class="verification-placeholder"
    @click="handleVerify"
  >
    Løs opgave
  </IonButton>
</section>

      </div>
    </IonContent>

    <IonFooter>
      <IonToolbar>
        <IonButton
          v-if="!task.completed"
          expand="block"
          class="footer-button"
          :style="{ '--border-radius': '50px' }"
          @click="toggleTask"
          size="small"
          :color="task.active ? 'danger' : 'primary'"
        >
          {{ task.active ? 'Afbryd opgave' : 'Start' }}
        </IonButton>
        <IonButton
          v-else-if="task.completed && !task._claimed"
          expand="block"
          class="footer-button"
          :style="{ '--border-radius': '50px' }"
          @click="handleClaim"
        >
          Hent belønning
        </IonButton>
        <IonAlert
        :is-open="showCancelAlert"
        header="Bekræft annullering"
        message="Er du sikker på, at du vil afbryde opgaven? Du skal starte forfra, hvis du begynder opgaven igen."
        :buttons="[
          { text: 'Nej', role: 'cancel', handler: onDismissCancel },
          { text: 'Ja', handler: onConfirmCancel }
        ]"
      />
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useTasks } from '@/composables/useTasks';
import { IonAlert } from '@ionic/vue';

import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent, IonFooter, IonButton
} from '@ionic/vue';

const route = useRoute();
const router = useRouter();
const { uid } = useAuth();
const { tasks, startTask, cancelTask, completeTask, claimReward } = useTasks(uid.value);

const id = route.params.id;
const task = computed(() => tasks.value.find(t => t.id === id) || {});

const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let intervalId;
function updateCountdown() {
  if (!task.value.deadline) return;
  const end = new Date(task.value.deadline);
  const now = new Date();
  let diff = end - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  diff %= 60000;
  const seconds = Math.floor(diff / 1000);
  timeLeft.value = { days, hours, minutes, seconds };
}

onMounted(() => {
  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
});
onUnmounted(() => clearInterval(intervalId));

const progressValue = computed(() => {
  if (task.value.completed) return 1;
  if (!task.value.active) return 0;
  const start = new Date(task.value.startDate);
  const end = new Date(task.value.deadline);
  const now = new Date();
  if (now >= end) return 1;
  return (now - start) / (end - start);
});

const progressPercent = computed(() => Math.round(progressValue.value * 100));
const animatedPercent = ref(0);

watch(progressPercent, async (val) => {
  animatedPercent.value = 0;
  await nextTick();
  setTimeout(() => { animatedPercent.value = val; }, 50);
}, { immediate: true });

async function handleVerify() {
  await completeTask(id);
}

async function handleClaim() {
  await claimReward(id);
  router.back();
}

// --- Alert control ---
const showCancelAlert = ref(false);

function onConfirmCancel() {
  // Actually cancel the task, then close the alert
  cancelTask(id)
    .catch(err => {
      console.error('Cancel failed:', err);
    })
    .finally(() => {
      showCancelAlert.value = false;
    });
}

function onDismissCancel() {
  // Just close the alert without doing anything
  showCancelAlert.value = false;
}

function toggleTask() {
  if (task.value.active) {
    // Instead of calling cancelTask immediately, open the alert
    showCancelAlert.value = true;
  } else {
    startTask(id);
  }
}
</script>

<style scoped> 

.task-image {
  width: 100%;
  height: 50vh;
  object-fit: cover;
}
.container {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.title-section h2 {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #02382C;
}
.title-section .description {
  margin-bottom: 1rem;
}
.countdown {
  margin-bottom: 1rem;
}
.count-coins {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
  border-radius: 15px;
  padding: 20px 0;
}
.count-coins .timer {
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
  margin-bottom: 12px;
  border-bottom: 5px solid #F6F3ED;
  padding-bottom: 12px;
  justify-content: center;
  width: 100%;
}
.coins-container {
  display: flex;
  flex-direction: row;
  align-items: center;       /* vertically center text & icon */
  justify-content: center;   /* horizontally center within the parent */
  gap: 0.5rem;               /* spacing between text and image */
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 1rem;
  margin: 0 auto;  
  padding: 1rem 2rem;  
}
.coins-container p {
  margin: 0;                 /* remove default block margins */
}
.coins-container img {
  display: inline-block;     /* ensure it sits inline with the text */
  height: 1em;               /* scale icon to match font size, if desired */
}
.progress {
  background-color: #eee;      /* samme lys grå baggrund */
  border-radius: 15px;         /* afrundede hjørner */
  padding: 20px;               /* indre luft omkring indholdet */
  margin-bottom: 5px;         /* afstand til næste sektion */
}
.progress-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.progress-bar {
  flex: 1;
  height: 8px;
  background: #DDDBD7;
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #02382C;
  transition: width 0.5s ease;
}
.progress-percent {
  font-weight: 600;
  width: 42px;
  text-align: center;
}
.steps ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}
.verification, .claim {
  margin-top: 1rem;
}
IonFooter {
  position: sticky;
  bottom: 0;
}
.footer-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: 20px;
  --padding-top: 15px;
  --padding-bottom: 15px;
  font-weight: 600;
}

h3 {
  font-size: 16px;
  font-weight: 600;
  color: #02382C;
}

.verification-placeholder {
  /* Remove Ionic’s built-in background and padding */
  --background: transparent;
  --background-hover: transparent;
  --padding-top: 0;
  --padding-bottom: 0;
  --padding-start: 0;
  --padding-end: 0;
  width: 100%;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 12px;
  /* Center the label text inside the box */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  color: #02382C;
  text-decoration: underline;
  font-weight: 600;
  margin-bottom: 30px ;
}

</style>