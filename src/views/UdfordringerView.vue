<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useChallenges } from '@/composables/useChallenges';
import { computed } from 'vue';
import UdfordringerCard from '@/components/UdfordringerCard.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import * as icons from 'ionicons/icons';

const router = useRouter();
const { uid } = useAuth();
const { challenges, activeChallenges, startChallenge, cancelChallenge } = useChallenges(uid.value);

const inactiveChallenges = computed(() =>
  challenges.value.filter(c => !c.active)
);

function toggleChallenge(id) {
  const c = challenges.value.find(x => x.id === id);
  if (c.active) cancelChallenge(id);
  else startChallenge(id);
}

function goToDetails(id) {
  router.push(`/tabs/udfordringer/${id}`);
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/tabs/hjem" />
        </IonButtons>
        <IonTitle>Udfordringer</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="no-pad">
      <template v-if="activeChallenges.length">
        <h3 class="section-title">Igangværende udfordringer</h3>
        <div class="card-list">
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
            :bg-image="c.bgImage"
            :button-text="c.active ? 'Annuller' : `+${c.points} pts`"
            @action="() => toggleChallenge(c.id)"
            @click.native="goToDetails(c.id)"
          />
        </div>
      </template>

      <h3 class="section-title">Alle udfordringer</h3>
      <div class="card-list">
        <UdfordringerCard
          v-for="c in inactiveChallenges"
          :key="c.id"
          :id="c.id"
          :title="c.title"
          :days-left="c.daysLeft"
          :points="c.points"
          :icon="icons[c.icon]"
          :bg-color="c.bgColor"
          :text-color="c.textColor"
          :active="c.active"
          :bg-image="c.bgImage"
          :button-text="c.active ? 'Annuller' : 'Start'"
          @action="() => toggleChallenge(c.id)"
          @click.native="goToDetails(c.id)"
        />
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.section-title {
  margin: 1rem 0 0.5rem;
  font-weight: 600;
  padding: 0 20px;
  font-size: 1.2rem;
  color: #02382C;

}
.card-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 0 10px;
}
</style>
