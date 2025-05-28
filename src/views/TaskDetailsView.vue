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
      <!-- Icon and category badge -->
      <div class="header-visuals">
        <IonIcon :icon="icons[task.icon]" size="large" />
        <span class="badge">{{ task.category }}</span>
      </div>

      <!-- Points & impact -->
      <div class="points-impact">
        <h3>Earn {{ task.points }} points</h3>
        <p>Save ~{{ task.estimatedCO2 }} CO₂</p>
        <small>{{ task.benefit }}</small>
      </div>

      <!-- Overview & instructions -->
      <section>
        <h4>Overview</h4>
        <p>{{ task.overview }}</p>
      </section>
      <section>
        <h4>Steps</h4>
        <ol>
          <li v-for="(step, i) in task.steps" :key="i">{{ step }}</li>
        </ol>
      </section>
      <section>
        <p><strong>Duration:</strong> {{ task.duration }}</p>
      </section>

      <!-- Requirements & verification -->
      <section>
        <h4>Requirements</h4>
        <ul>
          <li v-for="(req, i) in task.prerequisites" :key="i">{{ req }}</li>
        </ul>
        <p><strong>Location:</strong> {{ task.location }}</p>
        <p><strong>Verify by:</strong> {{ task.verification }}</p>
      </section>

      <!-- Safety & accessibility -->
      <section>
        <h4>Safety Tips</h4>
        <ul>
          <li v-for="(tip, i) in task.safetyTips" :key="i">{{ tip }}</li>
        </ul>
        <h4>Accessibility</h4>
        <p>{{ task.accessibility }}</p>
      </section>

      <!-- Call to action -->
      <IonButton expand="block" @click="toggleTask">
        {{ task.active ? 'Annuller opgave' : 'Start opgave' }}
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useTasks } from '@/composables/useTasks';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonButton
} from '@ionic/vue';
import * as icons from 'ionicons/icons';

const route = useRoute();
const router = useRouter();
const { uid } = useAuth();
const { getTask, startTask, cancelTask } = useTasks(uid.value);
const task = ref({});

onMounted(() => {
  const id = route.params.id;
  task.value = getTask(id) || {};
});

async function toggleTask() {
  if (task.value.active) {
    await cancelTask(task.value.id);
  } else {
    await startTask(task.value.id);
  }
  router.back();
}
</script>

<style scoped>
.header-visuals {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.badge {
  background: #d1e7dd;
  color: #0f5132;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}
.points-impact {
  margin-bottom: 24px;
}
.points-impact h3 {
  margin: 0;
}
section {
  margin-bottom: 16px;
}
</style>