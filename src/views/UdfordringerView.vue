<template>
  <IonPage>
    <!-- Header -->
    <IonHeader>
      <IonToolbar>
        <IonTitle>Udfordringer</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <!-- IGANGVÆRENDE UDFORDRINGER -->
      <h3 class="section-title">Igangværende udfordringer</h3>
      <div class="card-grid">
        <UdfordringerCard
          v-for="c in ongoing"
          :key="c.id"
          :title="c.title"
          :daysLeft="c.daysLeft"
          :points="c.points"
          :icon="c.icon"
          :buttonText="`+${c.points} pts`"
          :bgColor="c.bgColor"
          :textColor="c.textColor"
          @action="() => viewDetails(c.id)"
        />
      </div>

      <!-- ALLE UDFORDRINGER -->
      <h3 class="section-title">Alle udfordringer</h3>
      <div class="card-grid">
        <UdfordringerCard
          v-for="c in allChallenges"
          :key="c.id"
          :title="c.title"
          :daysLeft="c.daysLeft"
          :points="c.points"
          :icon="c.icon"
          buttonText="Start"
          :bgColor="c.bgColor"
          :textColor="c.textColor"
          @action="() => startChallenge(c.id)"
        />
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UdfordringerCard from '@/components/UdfordringerCard.vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/vue';
import { bicycleOutline, refreshOutline } from 'ionicons/icons';

const router = useRouter();

// Define ongoing and all challenges separately
const ongoing = ref([
  { id: 't1', title: 'Juni cykel udfordring', daysLeft: 8, points: 50, icon: bicycleOutline, bgColor: '#D2E3BC', textColor: '#02382C' }
]);

const allChallenges = ref([
  { id: 't2', title: 'Hold telefonen slukket i 12 timer', daysLeft: 21, points: 40, icon: refreshOutline, bgColor: '#FFF1E5', textColor: '#02382C' },
  { id: 't3', title: 'Bæredygtig transport i en uge', daysLeft: 30, points: 60, icon: bicycleOutline, bgColor: '#C9E0DD', textColor: '#02382C' }
]);

function viewDetails(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}

function startChallenge(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}
</script>

<style scoped>
.section-title {
  margin: 1rem 0 0.5rem;
}
.card-grid {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}
</style>
