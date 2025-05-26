<template>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/tabs/shop" />
          </IonButtons>
          <IonTitle>Indløs Belønning</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent fullscreen class="no-pad">
        <!-- Reward summary card -->
        <IonCard class="summary-card">
          <IonItem lines="none">
            <IonThumbnail slot="start">
              <img :src="product.image" :alt="product.title" />
            </IonThumbnail>
            <IonLabel>
              <h2>{{ product.title }}</h2>
              <p>{{ product.points }} point</p>
              <p class="coins-left">{{ coinsLeft }} point tilbage</p>
            </IonLabel>
          </IonItem>
        </IonCard>
  
        <!-- Purchase form -->
        <div class="purchase-form">
          <h2>Udfyld dine oplysninger</h2>
  
          <!-- Email -->
          <IonItem :class="{ invalid: form.email && !emailValid }" lines="none">
            <IonLabel for="email-input" position="stacked">Email</IonLabel>
            <IonInput id="email-input" v-model="form.email" placeholder="Din email" />
          </IonItem>
          <IonText v-if="form.email && !emailValid" color="danger" class="error-text">
            Ugyldig email
          </IonText>
  
          <!-- Fornavn -->
          <IonItem :class="{ invalid: form.firstName === '' }" lines="none">
            <IonLabel for="firstname-input" position="stacked">Fornavn</IonLabel>
            <IonInput id="firstname-input" v-model="form.firstName" placeholder="Fornavn" />
          </IonItem>
  
          <!-- Efternavn -->
          <IonItem :class="{ invalid: form.lastName === '' }" lines="none">
            <IonLabel for="lastname-input" position="stacked">Efternavn</IonLabel>
            <IonInput id="lastname-input" v-model="form.lastName" placeholder="Efternavn" />
          </IonItem>
  
          <!-- Postnummer -->
          <IonItem :class="{ invalid: form.postcode && !postcodeValid }" lines="none">
            <IonLabel for="postcode-input" position="stacked">Postnummer</IonLabel>
            <IonInput id="postcode-input" v-model="form.postcode" placeholder="Postnummer" maxlength="4" />
          </IonItem>
          <IonText v-if="form.postcode && !postcodeValid" color="danger" class="error-text">
            Skal være præcis 4 cifre
          </IonText>
  
          <!-- Fødselsdag -->
          <IonItem :class="{ invalid: form.birthday === '' }" lines="none">
            <IonLabel for="birthday-input" position="stacked">Fødselsdag</IonLabel>
            <IonInput id="birthday-input" v-model="form.birthday" type="date" />
          </IonItem>
  
          <!-- Køn -->
          <IonItem :class="{ invalid: form.gender === '' }" lines="none">
            <IonLabel for="gender-select" position="stacked">Køn</IonLabel>
            <IonSelect id="gender-select" v-model="form.gender" placeholder="Vælg køn">
              <IonSelectOption value="male">Mand</IonSelectOption>
              <IonSelectOption value="female">Kvinde</IonSelectOption>
              <IonSelectOption value="other">Andet</IonSelectOption>
            </IonSelect>
          </IonItem>
        </div>
      </IonContent>
  
      <!-- Footer confirm button -->
      <IonFooter>
        <IonToolbar>
          <IonButton
            expand="block"
            fill="solid"
            shape="round"
            class="footer-btn"
            @click="submitPurchase"
            :disabled="!canPurchase"
          >
            Bekræft køb
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonContent, IonFooter,
    IonCard, IonItem, IonLabel, IonInput,
    IonButton, IonThumbnail, IonSelect, IonSelectOption,
    IonText
  } from '@ionic/vue';
  import rewards from '@/data/belonninger.json';
  import { getBalance, changeBalance } from '@/firebaseRest.js';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuth } from '@/composables/useAuth';
  
  const route = useRoute();
  const router = useRouter();
  const { uid } = useAuth();
  const id = route.params.id;
  
  const product = ref({});
  const balance = ref(0);
  const coinsLeft = computed(() => balance.value - (product.value.points || 0));
  
  const form = ref({
    email: '',
    firstName: '',
    lastName: '',
    postcode: '',
    birthday: '',
    gender: ''
  });
  
  const emailValid = computed(() => /\S+@\S+\.\S+/.test(form.value.email));
  const postcodeValid = computed(() => /^\d{4}$/.test(form.value.postcode));
  
  const canPurchase = computed(() => {
    return (
      emailValid.value &&
      form.value.firstName &&
      form.value.lastName &&
      postcodeValid.value &&
      form.value.birthday &&
      form.value.gender &&
      coinsLeft.value >= 0
    );
  });
  
  async function submitPurchase() {
    if (!canPurchase.value) return;
    try {
      await changeBalance(uid.value, -product.value.points);
      router.back();
    } catch (e) {
      console.error(e);
    }
  }
  
  onMounted(async () => {
    const found = rewards.find(r => String(r.id) === String(id));
    if (!found) {
      router.back();
      return;
    }
    product.value = found;
    balance.value = await getBalance(uid.value) || 0;
  });
  </script>
  
  <style scoped>
  .no-pad {
    --padding-start: 0;
    --padding-end: 0;
  }
  .summary-card {
    margin: 16px;
  }
  .summary-card ion-item {
    align-items: center;
  }
  .summary-card ion-thumbnail img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }
  .summary-card h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
  .summary-card p {
    margin: 4px 0 0;
    font-size: 14px;
  }
  .coins-left {
    font-weight: 600;
    color: #02382C;
  }
  .purchase-form {
    padding: 16px;
  }
  .purchase-form h2 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
  }
  .invalid {
    --border-color: #eb445a !important;
  }
  .error-text {
    margin: 4px 16px;
    font-size: 12px;
  }
  .footer-btn {
    font-size: 16px;
    font-weight: 600;
    --border-radius: 50px;
  }
  </style>
  
  
  