<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/tabs/shop" />
        </IonButtons>
        <IonTitle>Detaljer</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen class="no-pad">
      <!-- Image -->
      <div class="image-wrapper">
        <IonImg :src="product.image" class="detail-image" />
      </div>

      <!-- Progress section -->
      <div class="progress-container">
        <div class="details-title">
          <h2>{{ product.title }} til {{ product.vendor }}</h2>
        </div>
        <div class="missing-text">
          <span v-if="balance < product.points">
            Du mangler {{ product.points - balance }} point for at indløse
          </span>
          <span v-else>
            Du har nok point til at indløse
          </span>
        </div>
        <div class="progress-row">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <div class="points-total">
            <img src="/icons/coins.png" class="coin-icon-small" alt="points" />
            <span>{{ product.points }}</span>
          </div>
        </div>
      </div>

      <!-- Divider before offer -->
      <div class="section-divider"></div>

      <!-- Offer section -->
      <div class="offer-section" v-if="product.offer">
        <h3>Om tilbud</h3>
        <p>{{ product.offer }}</p>
      </div>

      <!-- Divider before info -->
      <div class="section-divider"></div>

      <!-- Company info title -->
      <h3 class="info-title">Information</h3>
      <IonCard class="info-card" v-if="product.location">
        <IonCardContent>
          <div class="map-container">
            <img :src="product.mapImage" class="map-image" alt="map" />
          </div>
          <div class="info-container">
            <p class="location"><strong>{{ product.location }}</strong></p>
            <p v-if="product.phone" class="phone">{{ product.phone }}</p>
            <p v-if="product.email" class="email">{{ product.email }}</p>
          </div>
        </IonCardContent>
      </IonCard>

      <!-- Description -->
      <div class="details">
        <p v-if="product.description">{{ product.description }}</p>
      </div>
    </IonContent>

    <!-- Footer button -->
    <IonFooter>
      <IonToolbar>
        <IonButton
          expand="block"
          fill="solid"
          shape="round"
          class="footer-btn"
          @click="goToPurchaseView"
          :disabled="balance < product.points"
          :color="balance < product.points ? 'medium' : 'primary'"
          style="margin: 0 16px;"
        >
          Indløs nu
        </IonButton>
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonFooter,
  IonImg,
  IonButton,
  IonCard,
  IonCardContent
} from '@ionic/vue';
import rewards from '@/data/belonninger.json';
import { getBalance } from '@/firebaseRest.js';
import { useAuth } from '@/composables/useAuth';

const route = useRoute();
const router = useRouter();
const { uid } = useAuth();
const id = route.params.id;

const product = ref({});
const balance = ref(0);
const progressPercent = ref(0);

function goToPurchaseView() {
  // navigate to PurchaseView route by name
  router.push({ name: 'PurchaseView', params: { id } });
}

onMounted(async () => {
  const found = rewards.find(r => String(r.id) === String(id));
  if (!found) {
    router.back();
    return;
  }
  product.value = found;
  balance.value = (await getBalance(uid.value)) || 0;
  progressPercent.value = Math.min((balance.value / product.value.points) * 100, 100);
});
</script>

<style scoped>
.info-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin: 0 20px 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.info-card ion-card-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px;
}
.section-divider {
  width: calc(100% - 40px);
  height: 1px;
  background: #DDDBD7;
  margin: 16px 20px;
}
.no-pad {
  --padding-start: 0;
  --padding-end: 0;
}
.image-wrapper {
  width:100%;
  height:350px;
  overflow:hidden;
}
.detail-image {
  width:100%;
  height:100%;
  object-fit:cover;
}
.progress-container {
  padding:16px;
}
.details-title h2 {
  font-size:20px;
  font-weight:600;
  color:#02382C;
  margin:0 0 8px;
}
.missing-text {
  font-size:14px;
  color:#02382C;
  margin-bottom:8px;
}
.progress-row {
  display:flex;
  align-items:center;
  gap:12px;
}
.progress-bar {
  flex:1;
  height:8px;
  background:#DDDBD7;
  border-radius:4px;
  overflow:hidden;
}
.progress-fill {
  height:100%;
  background:#02382C;
  transition:width 0.3s ease;
}
.points-total {
  display:inline-flex;
  align-items:center;
  gap:4px;
  font-size:16px;
  font-weight:600;
}
.coin-icon-small {
  width:16px;
  height:16px;
  object-fit:contain;
}
.offer-section {
  padding:0 20px 16px;
}
.offer-section h3 {
  margin:0 0 8px;
  font-size:18px;
  font-weight:600;
  color:#02382C;
}
.offer-section p {
  margin:0;
  font-size:14px;
  color:#02382C;
  line-height:1.4;
}
.info-title {
  margin:0 20px 8px;
  font-size:18px;
  font-weight:600;
  color:#02382C;
}
.map-container {
  flex:none;
  width:120px;
  height:130px;
  overflow:hidden;
  border-radius:15px;
}
.map-image {
  width:100%;
  height:100%;
  object-fit:cover;
}
.info-container {
  flex:1;
  padding:16px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:4px;
}
.info-container p {
  margin:0;
  font-size:14px;
  color:#02382C;
  line-height:1.4;
}
.info-container .location {
  font-size:16px;
  font-weight:600;
}
.details {
  padding:16px;
}
.footer-btn {
  font-size:20px;
  font-weight:600;
  --border-radius:50px;
}
</style>
