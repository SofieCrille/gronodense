<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Hjem</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h3 class="section-title">Opgaver</h3>
      <div class="card-grid">
        <ChallengeCard
          title="Bæredygtig transport"
          description="Tag cyklen eller offentlig transport, fx. til eller fra uddanelse/arbejde."
          buttonText="Begynd nu"
          :leftIcon="bicycleOutline"
          :rightIcon="trophyOutline"
          bgColor="#C9E0DD"
          textColor="#02382C"
          :onActionClick="onDetailsClick"
        />

        <ChallengeCard
          title="Affaldssortering"
          description="Lær hvordan du skralder korrekt med vores søgemaskine og scanner"
          buttonText="Begynd nu"
          :leftIcon="trashOutline"
          :rightIcon="trophyOutline"
          bgColor="#D2E3BC"
          textColor="#02382C"
          :onActionClick="onDetailsClick"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ChallengeCard from '@/components/ChallengeCard.vue'
import { bicycleOutline, trophyOutline, trashOutline } from 'ionicons/icons'

const router = useRouter()

function onDetailsClick() {
  router.push('/tabs/udfordringer')
}
</script>

<style scoped>
.card-grid {
  display: flex;
  flex-wrap: nowrap; /* IKKE wrap, så de ikke går under hinanden */
  gap: 1rem;
  justify-content: flex-start;
  overflow-x: auto; /* Hvis der ikke er plads, kan man scrolle horisontalt */
  padding-bottom: 1rem;
}

.challenge-card {
  flex: 0 0 48%; /* fast bredde ca halvdelen minus lidt margin */
  max-width: 48%;
  box-sizing: border-box;
  min-width: 150px; /* minimum bredde så kort ikke bliver for smalle */
}

</style>