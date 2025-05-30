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

    <IonContent class="ion-padding">
      <section class="image-section">
        <img src="/img/grey.png" alt="Task image" class="task-image" />
      </section>

      <section class="title-section">
        <h2>{{ task.title }}</h2>
        <p class="description">{{ task.description }}</p>
      </section>

      <section v-if="task.active && !task.completed" class="countdown">
        <h3>Tid tilbage:</h3>
        <div class="timer">
          <span>{{ timeLeft.days }}d</span>
          <span>{{ timeLeft.hours }}h</span>
          <span>{{ timeLeft.minutes }}m</span>
          <span>{{ timeLeft.seconds }}s</span>
        </div>
      </section>

      <section v-if="(task.active || task.completed)" class="progress">
        <h3>Din fremgang</h3>
        <IonProgressBar :value="progressValue" />
      </section>

      <section v-if="task.steps" class="steps">
        <h3>Trin</h3>
        <ul>
          <li v-for="(step, i) in task.steps" :key="i">{{ step }}</li>
        </ul>
      </section>

      <section v-if="task.active && !task.completed" class="verification">
        <IonButton expand="block" @click="handleVerify">Løs opgave</IonButton>
      </section>

      <section v-if="task.completed && !task._claimed" class="claim">
        <IonButton expand="block" @click="handleClaim">Hent belønning</IonButton>
      </section>

      <IonButton
        v-if="!task.completed"
        expand="block"
        class="start-button"
        @click="toggleTask"
      >
        {{ task.active ? 'Annuller' : 'Start' }}
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useTasks } from '@/composables/useTasks';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent, IonProgressBar, IonButton
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

async function handleVerify() {
  await completeTask(id);
  router.back();
}

async function handleClaim() {
  await claimReward(id);
}

function toggleTask() {
  if (task.value.active) cancelTask(id);
  else startTask(id);
}
</script>

<style scoped>
.image-section { text-align: center; margin-bottom: 1rem; }
.task-image { width: 100%; height: auto; border-radius: 8px; }
.title-section h2 { margin-top: 0; font-size: 1.5rem; font-weight: bold; }
.title-section .description { margin-bottom: 1rem; }
.countdown .timer { display: flex; gap: 0.5rem; font-size: 1.2rem; margin-bottom: 1rem; }
.progress { margin-bottom: 1rem; }
.steps ul { padding-left: 1.2rem; margin-bottom: 1rem; }
.verification { margin-bottom: 1.5rem; }
.start-button { margin-top: 1rem; }
.claim { margin-top: 1rem; }
</style>
