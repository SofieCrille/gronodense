<template>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <!-- Back button: tries history, falls back to challenges list -->
            <IonBackButton default-href="/tabs/udfordringer" @click="goBack" />
          </IonButtons>
          <IonTitle>{{ challenge.title }}</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent class="ion-padding">
        <h2>{{ challenge.title }}</h2>
        <p>{{ challenge.description }}</p>
        <p><strong>Dage tilbage:</strong> {{ challenge.daysLeft }}</p>
        <p><strong>Points:</strong> +{{ challenge.points }} pts</p>
        <!-- Start/Cancel Button -->
        <IonButton expand="block" class="start-button" @click="toggleChallenge">
          {{ challenge.active ? 'Annuller' : 'Start' }}
        </IonButton>
      </IonContent>
    </IonPage>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useChallenges } from '@/composables/useChallenges';
  import { useAuth } from '@/composables/useAuth';
  import {
    IonPage, IonHeader, IonToolbar, IonButtons,
    IonBackButton, IonTitle, IonContent, IonButton
  } from '@ionic/vue';
  
  const route = useRoute();
  const router = useRouter();
  const { uid } = useAuth();
  const { challenges, startChallenge, cancelChallenge } = useChallenges(uid.value);
  
  const id = route.params.id;
  const challenge = computed(() => challenges.value.find(c => c.id === id) || {});
  
  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace({ name: 'UdfordringerView' });
    }
  }
  
  function toggleChallenge() {
    if (challenge.value.active) {
      cancelChallenge(id);
    } else {
      startChallenge(id);
    }
  }
  </script>
  
  <style scoped>
  h2 {
    margin-top: 0;
  }
  .start-button {
    margin-top: 20px;
  }
  </style>
  