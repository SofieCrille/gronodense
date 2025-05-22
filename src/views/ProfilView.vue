<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { bicycleOutline, trashOutline } from 'ionicons/icons';
import { starOutline } from 'ionicons/icons';

const router = useRouter();

function goToUdfordringer() {
  router.push({ name: 'UdfordringerView' });
}

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

      <section class="statistik">
        <div class="section-header">
          <h4>Dine statistikker</h4>
          <IonButton fill="clear" size="small">Se alle</IonButton>
        </div>

        <div class="card-row large-cards">
          <IonCard class="large-card large-card--purple">
            <IonIcon icon="bicycleOutline" size="large" />
            <IonCardContent>
              <h5>407 km</h5>
              <p>Du har anvendt grøn transport 36% mere end andre brugere!</p>
            </IonCardContent>
          </IonCard>

          <IonCard class="large-card large-card--green">
            <IonIcon icon="trashOutline" size="large" />
            <IonCardContent>
              <h5>3 træer reddet</h5>
              <p>Du har sparet CO₂ svarende til 3 træer ved at køre 407 km i grøn transport</p>
            </IonCardContent>
          </IonCard>
        </div>

        <div class="card-row small-cards">
          <IonCard class="small-card">
            <IonCardContent>17 opgaver udført</IonCardContent>
          </IonCard>
          <IonCard class="small-card">
            <IonCardContent>9 stykker skrald sorteret korrekt</IonCardContent>
          </IonCard>
        </div>
      </section>

      <section class="udfordringer">
        <div class="section-header">
          <h3 class="section-title">Udfordringer</h3>
          <IonButton fill="clear" @click="goToUdfordringer" size="small">Se alle</IonButton>
        </div>

        <IonCard class="custom-card">
          <IonCardContent>
            <p>Her kan du skrive tekst til udfordringen og style kortet efter behov.</p>
          </IonCardContent>
        </IonCard>
      </section>

      <section class="badges">
  <div class="section-header">
    <h4>Badges</h4>
    <IonButton fill="clear" size="small">Se alle</IonButton>
  </div>

  <div class="badge-row">
    <div class="badge badge-green">3</div>
    <div class="badge badge-blue">100 km</div>
    <div class="badge badge-purple">1</div>
  </div>
</section>

<section class="historik">
  <div class="section-header">
    <h4>Historik</h4>
    <IonButton fill="clear" size="small">Se alle</IonButton>
  </div>

  <h5 class="historik-subtitle">I dag</h5>

  <ul class="historik-list">
    <li class="historik-item">
      <span>Udførte opgave: Sortering af skrald</span>
      <div class="point">
        <IonIcon :icon="starOutline" />
        <span>+20</span>
      </div>
    </li>
    <li class="historik-item">
      <span>Udførte opgave: Cyklet til skole</span>
      <div class="point">
        <IonIcon :icon="starOutline" />
        <span>+15</span>
      </div>
    </li>
    <li class="historik-item">
      <span>Udførte opgave: Hjælp i fælleshaven</span>
      <div class="point">
        <IonIcon :icon="starOutline" />
        <span>+30</span>
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
  margin-top: 2rem;
}

.round-image {
  width: 120px;
  height: 120px;
  border-radius: 50%; /* Rundt */
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

.statistik {
  margin-top: 2rem;
  padding: 0 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.large-cards .large-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.large-card--purple {
  background-color: #CBCBE3; /* lys grøn */
  color: #02382C; /* mørk grøn tekst */
}

.large-card--green {
  background-color: #02382C; /* lys blå */
  color: #C3DCA5; /* mørk blå tekst */
}

.large-card ion-icon {
  font-size: 2.5rem;
  color: var(--ion-color-primary);
}

.small-cards .small-card {
  flex: 1;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  background-color: #ffffff;
}

.udfordringer {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 10px;
}

.section-title {
  margin: 0;
  font-weight: bold;
  font-size: 1.2rem;
}

.custom-card {
  padding: 1rem;
  background-color: #005F4A;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.badges {
  margin-top: 2rem;
  padding: 0 1rem;
}

.badge-row {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  gap: 1rem;
}

.badge {
  width: 80px;
  height: 80px;
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
  padding: 1rem;
  border-radius: 10px;
}

.historik-subtitle {
  margin: 0.5rem 0 1rem;
  font-size: 1rem;
  color: #555;
  font-weight: 500;
}

.historik-list {
  list-style: none;
  padding: 0;
  margin: 0;
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
</style>
