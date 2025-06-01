<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon
} from '@ionic/vue';

import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { leafOutline } from 'ionicons/icons';

import { useAuth } from '@/composables/useAuth';
import { useChallenges } from '@/composables/useChallenges';
import UdfordringerCard from '@/components/UdfordringerCard.vue';

const router = useRouter();
const { uid } = useAuth();
const { activeChallenges } = useChallenges(uid.value);

const ongoing = computed(() => activeChallenges.value);

function goToUdfordringer() {
  router.push({ name: 'UdfordringerView' });
}

function toggleChallenge(id) {
  console.log('Toggling challenge with ID:', id);
}

function viewDetails(id) {
  router.push({ name: 'ChallengeDetails', params: { id } });
}

const icons = {
  leaf: leafOutline
  // Add more icons if needed
};

const user = {
  name: 'Maja Sørensen',
  email: 'majasorensen@gmail.com'
};
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Profil</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div class="profile-container">
        <img src="/img/profilbillede.png" alt="Profilbillede" class="round-image" />
        <h3 class="profile-name">{{ user.name }}</h3>
        <p class="profile-email">{{ user.email }}</p>
      </div>

      <div class="section-divider"></div>

      <section class="statistik">
        <div class="section-header">
          <h3 class="section-title">Dine statistikker</h3>
          <IonButton class="see-all" fill="clear" size="small">Se alle ›</IonButton>
        </div>

        <div class="card-grid">
          <div class="stat-card large stat-card--purple">
            <div class="stat-value">407 km</div>
            <p class="stat-description">Du har anvendt grøn transport 36% mere end andre brugere!</p>
          </div>

          <div class="stat-card large stat-card--green">
            <div class="stat-value">3 træer reddet</div>
            <p class="stat-description">Du har sparet CO₂ svarende til 3 træer ved at køre 407 km i grøn transport</p>
          </div>

          <div class="stat-card small">
            <div class="stat-value">17</div>
            <p class="stat-description">Udførte opgaver</p>
          </div>

          <div class="stat-card small">
            <div class="stat-value">550</div>
            <p class="stat-description">Point tjent</p>
          </div>
        </div>
      </section>

      <section class="udfordringer">
        <div class="section-header">
          <h3 class="section-title">Udfordringer</h3>
          <IonButton class="see-all" fill="clear" size="small" @click="goToUdfordringer">Se alle ›</IonButton>
        </div>

        <div class="card-grid">
          <UdfordringerCard
            v-for="challenge in ongoing"
            :key="challenge.id"
            :id="challenge.id"
            :title="challenge.title"
            :days-left="challenge.daysLeft"
            :points="challenge.points"
            :icon="icons[challenge.icon]"
            :bg-color="challenge.bgColor"
            :text-color="challenge.textColor"
            :active="challenge.active"
            :bg-image="challenge.bgImage || ''"
            :button-text="challenge.active ? 'Annuller' : 'Start'"
            @action="() => toggleChallenge(challenge.id)"
            @click.native="viewDetails(challenge.id)"
          />
        </div>
      </section>

      <section class="badges">
        <div class="section-header">
          <h3 class="section-title">Badges</h3>
          <IonButton class="see-all" fill="clear" size="small">Se alle ›</IonButton>
        </div>

        <div class="badge-row">
          <div class="badge badge-green">3</div>
          <div class="badge badge-blue">100 km</div>
          <div class="badge badge-purple">1</div>
        </div>
      </section>

      <section class="historik">
  <div class="section-header">
    <h3 class="section-title">Historik</h3>
    <IonButton class="see-all" fill="clear" size="small">Se alle ›</IonButton>
  </div>

  <h5 class="historik-subtitle">I dag</h5>

  <ul class="historik-list">
    <li class="historik-item">
      <span>Udførte opgave: Grøn transport</span>
      <div class="point">
        <img src="/icons/coins.png" alt="coin icon" class="coin-icon" />
        <span>+20</span>
      </div>
    </li>
    <li class="historik-item">
      <span>Udførte opgave: Skraldesortering</span>
      <div class="point">
        <img src="/icons/coins.png" alt="coin icon" class="coin-icon" />
        <span>+15</span>
      </div>
    </li>
    <li class="historik-item">
      <span>Indløste: 20kr voucher til SDU kantine</span>
      <div class="point">
        <img src="/icons/coins.png" alt="coin icon" class="coin-icon" />
        <span>-100</span>
      </div>
    </li>
  </ul>
</section>
    </IonContent>
  </IonPage>
</template>


<style scoped>
.profile-container {
  text-align: center;
}

.round-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 1rem;
}

.profile-name {
  font-weight: bold;
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
}

.profile-email {
  margin: 0;
  color: #555;
  font-size: 1rem;
  text-align: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 20px 1rem;
}

.section-title {
  margin: 0;
  font-weight: 600;
  font-size: 1.2rem;
}

.section-divider {
  width: calc(100% - 40px);
  height: 1px;
  background: #DDDBD7;
  margin: 30px 20px;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px;
  margin-bottom: 2rem;
}

.stat-card {
  width: calc(50% - 5px);
  border-radius: 15px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.stat-card.large {
  height: 180px;
  font-size: 1rem;
}

.stat-card.small {
  height: 100px;
  font-size: 0.9rem;
}

.stat-card--purple {
  background-color: #CBCBE3;
  color: #02382C;
}

.stat-card--green {
  background-color: #02382C;
  color: #C3DCA5;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-description {
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
}

.custom-card {
  padding: 1rem;
  background-color: #005F4A;
  color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.custom-card h3 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.custom-card p {
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
}

.badge-row {
  display: flex;
  justify-content: space-around;
  margin: 0 20px;
  margin-top: 1rem;
  gap: 20px;
}

.badge {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: default;
}

.badge-green {
  background-color: #02382C;
  color: #C2DDA5;
}

.badge-blue {
  background-color: #97C0E8;
  color: #062D26;
}

.badge-purple {
  background-color: #B1B1DA;
  color: #062D26;
}

.historik {
  margin-top: 2rem;
  border-radius: 10px;
}

.historik-subtitle {
  margin: 0.5rem 0 1rem;
  font-size: 1rem;
  color: #555;
  font-weight: 500;
  padding: 0 20px;
}

.historik-list {
  list-style: none;
  padding: 0;
  margin: 0;
  padding: 0 20px;
}

.historik-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #ddd;
}

.historik-item:last-child {
  border-bottom: none;
}

.point {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: bold;
  color: var(--ion-color-primary);
}

.coin-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

</style>


