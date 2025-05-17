<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Hjem</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <h3 class="section-title">Opgaver</h3>
      <div class="card-grid">
        <ChallengeCard
          id="transport"
          title="Bæredygtig transport"
          description="Tag cyklen eller offentlig transport, fx. til eller fra uddanelse/arbejde."
          buttonText="Begynd nu"
          :leftIcon="bicycleOutline"
          :rightIcon="trophyOutline"
          bgColor="#C9E0DD"
          textColor="#02382C"
          :onActionClick="() => onDetailsClick('transport')"
        />

        <ChallengeCard
          id="affald"
          title="Affaldssortering"
          description="Lær hvordan du skralder korrekt med vores søgemaskine og scanner"
          buttonText="Begynd nu"
          :leftIcon="trashOutline"
          :rightIcon="trophyOutline"
          bgColor="#D2E3BC"
          textColor="#02382C"
          :onActionClick="() => onDetailsClick('affald')"
        />
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { useRouter } from 'vue-router';
import ChallengeCard from '@/components/ChallengeCard.vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/vue';
import {
  bicycleOutline,
  trophyOutline,
  trashOutline
} from 'ionicons/icons';

const router = useRouter();

function onDetailsClick(id) {
  router.push({
    name: 'ChallengeDetails',
    params: { id }
  });
}
</script>


<style scoped>
.card-grid {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}
</style>
