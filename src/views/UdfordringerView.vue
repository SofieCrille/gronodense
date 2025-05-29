<template>
  <IonPage>
    <!-- Header -->
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/tabs/hjem" />
        </IonButtons>
        <IonTitle>Udfordringer</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <!-- IGANGVÆRENDE UDFORDRINGER -->
      <h3 class="section-title">Igangværende udfordringer</h3>
      <div class="card-grid">
        <UdfordringerCard
          v-for="c in activeChallenges"
          :key="c.id"
          :id="c.id"
          :title="c.title"
          :days-left="c.daysLeft"
          :points="c.points"
          :icon="icons[c.icon]"
          :bg-color="c.bgColor"
          :text-color="c.textColor"
          :active="c.active"
          :button-text="c.active ? 'Annuller' : `+${c.points} pts`"
          @action="() => toggleChallenge(c.id)"
          @click.native="goToDetails(c.id)"
        />
      </div>

      <!-- ALLE UDFORDRINGER -->
      <h3 class="section-title">Alle udfordringer</h3>
      <div class="card-grid">
        <UdfordringerCard
          v-for="c in challenges"
          :key="c.id"
          :id="c.id"
          :title="c.title"
          :days-left="c.daysLeft"
          :points="c.points"
          :icon="icons[c.icon]"
          :bg-color="c.bgColor"
          :text-color="c.textColor"
          :active="c.active"
          :button-text="c.active ? 'Annuller' : 'Start'"
          @action="() => toggleChallenge(c.id)"
          @click.native="goToDetails(c.id)"
        />
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useChallenges } from '@/composables/useChallenges';
import UdfordringerCard from '@/components/UdfordringerCard.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import * as icons from 'ionicons/icons';

const router = useRouter();
const { uid } = useAuth();
const { challenges, activeChallenges, startChallenge, cancelChallenge } = useChallenges(uid.value);

function toggleChallenge(id) {
  const c = challenges.value.find(x => x.id === id);
  if (c.active) cancelChallenge(id);
  else startChallenge(id);
}

function goToDetails(id) {
  router.push(`/tabs/udfordringer/${id}`);
}
</script>

<style scoped>
.section-title {
  margin: 1rem 0 0.5rem;
  font-weight: 600;
}
.card-grid {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}
</style>