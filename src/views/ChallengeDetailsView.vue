<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/tabs/udfordringer" @click="goBack" />
        </IonButtons>
        <IonTitle>{{ challenge.title }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="no-pad">
      <section v-if="challenge.bgImage" class="image-section">
        <img :src="challenge.bgImage" alt="Challenge image" class="challenge-image" />
      </section>
      <div class="container">
        <section class="title-section">
          <h2>{{ challenge.title }}</h2>
          <p class="description">{{ challenge.description }}</p>
        </section>

        <section class="countdown" v-if="challenge.daysLeft !== undefined">
          <h3>Dage tilbage</h3>
          <div class="count-coins">
            <div class="timer">
              <span>{{ challenge.daysLeft }} d</span>
            </div>
            <p class="coins-earned">+{{ challenge.points }} pts</p>
          </div>
        </section>
      </div>
    </IonContent>

    <IonFooter>
      <IonToolbar>
        <IonButton
          expand="block"
          class="footer-button"
          :style="{ '--border-radius': '50px' }"
          @click="toggleChallenge"
        >
          {{ challenge.active ? 'Annuller' : 'Start' }}
        </IonButton>
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useChallenges } from '@/composables/useChallenges';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent, IonFooter, IonButton
} from '@ionic/vue';

const route = useRoute();
const router = useRouter();
const { uid } = useAuth();
const { challenges, startChallenge, cancelChallenge } = useChallenges(uid.value);

const id = route.params.id;
const challenge = computed(() => challenges.value.find(c => c.id === id) || {});

function goBack() {
  if (window.history.length > 1) router.back();
  else router.replace({ name: 'UdfordringerView' });
}

function toggleChallenge() {
  if (challenge.value.active) cancelChallenge(id);
  else startChallenge(id);
}
</script>

<style scoped>
.image-section {
  width: 100%;
}
.challenge-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.container {
  padding: 0 20px;
}
.title-section h2 {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}
.title-section .description {
  margin-bottom: 1rem;
  color: #555;
}
.countdown {
  margin-bottom: 1rem;
}
.count-coins {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eee;
  border: 1px solid #F6F3ED;
  border-radius: 8px;
  padding: 12px;
}
.count-coins .timer {
  font-size: 1.2rem;
  margin-bottom: 8px;
}
.coins-earned {
  font-weight: 600;
  text-align: center;
}
IonFooter {
  position: sticky;
  bottom: 0;
}
.footer-button {
  margin: 0 20px 10px;
}
</style>
