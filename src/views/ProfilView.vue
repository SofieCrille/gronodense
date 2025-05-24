<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { starOutline, leafOutline } from 'ionicons/icons';

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
            <IonCardContent>
              <h1>407 km</h1>
              <p>Du har anvendt grøn transport 36% mere end andre brugere!</p>
            </IonCardContent>
          </IonCard>

          <IonCard class="large-card large-card--green">
            <IonCardContent>
              <h1>3 træer reddet</h1>
              <IonIcon :icon="leafOutline" class="icon-green" />
              <p>Du har sparet CO₂ svarende til 3 træer ved at køre 407 km i grøn transport</p>
            </IonCardContent>
          </IonCard>
        </div>

        <div class="card-row small-cards">
          <IonCard class="small-card">
            <IonCardContent class="small-card-content">
              <div class="card-number">17</div>
              <div class="card-text">
                <h2>Opgaver</h2>
                <h4>Udført</h4>
              </div>
            </IonCardContent>
          </IonCard>
          <IonCard class="small-card">
            <IonCardContent class="small-card-content">
              <div class="card-number">9</div>
              <div class="card-text">
                <h2>Stykker skrald</h2>
                <h4>Sorteret korrekt</h4>
              </div>
            </IonCardContent>
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
            <h3>Juni cykel udfordring</h3>
            <p>8 dage tilbage</p>
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
      <span>Udførte opgave: Grøn transport</span>
      <div class="point">
        <IonIcon :icon="starOutline" />
        <span>+20</span>
      </div>
    </li>
    <li class="historik-item">
      <span>Udførte opgave: Skraldesortering</span>
      <div class="point">
        <IonIcon :icon="starOutline" />
        <span>+15</span>
      </div>
    </li>
    <li class="historik-item">
      <span>Indløste: 20kr voucher til SDU kantine</span>
      <div class="point">
        <IonIcon :icon="starOutline" />
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
  border-radius: 15px;
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

.icon-green {
  color: #C3DCA5 !important; /* Brug !important hvis andet overskriver det */
  font-size: 1.2rem;
}

.small-cards .small-card {
  flex: 1;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 15px;
}

.small-card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-number {
  font-size: 3rem;
  font-weight: bold;
  color: #02382C;
  min-width: 60px;
  text-align: center;
}

.card-text h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #02382C;
}

.card-text h4 {
  margin: 0.3rem 0 0 0;
  font-size: 0.9rem;
  font-weight: normal;
  color: #555;
}

.udfordringer {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 15px;
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
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.custom-card h3 {
  font-weight: 600;       /* semi-bold */
  margin-bottom: 0.5rem;  /* lidt luft under overskriften */
  line-height: 1.4;       /* øget linjeafstand */
}

.custom-card p {
  font-weight: 500;       /* lidt lettere end semi-bold */
  line-height: 1.6;       /* mere luft mellem linjerne */
  margin: 0;              /* fjern evt. standard margin */
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
