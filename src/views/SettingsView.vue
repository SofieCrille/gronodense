<template>
  <IonPage>
    <!-- Header with back button -->
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tabs/profil" />
        </IonButtons>
        <IonTitle>Indstillinger</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <!-- Konto section -->
      <IonList lines="full">
        <IonListHeader>Konto</IonListHeader>
        <IonItem button @click="goEditProfile">
          <IonLabel>Rediger profil</IonLabel>
        </IonItem>
        <IonItem button @click="goAccountSettings">
          <IonLabel>Kontoinstillinger</IonLabel>
        </IonItem>
        <IonItem button @click="goNotifications">
          <IonLabel>Notifikationer</IonLabel>
        </IonItem>
      </IonList>

      <!-- Information section -->
      <IonList lines="full">
        <IonListHeader>Information</IonListHeader>
        <IonItem button @click="goHowToUse">
          <IonLabel>Sådan bruger du appen</IonLabel>
        </IonItem>
        <IonItem button @click="goTerms">
          <IonLabel>Vilkår og betingelser</IonLabel>
        </IonItem>
        <IonItem button @click="goPrivacy">
          <IonLabel>Privatlivspolitik</IonLabel>
        </IonItem>
      </IonList>

      <!-- Hjælp section -->
      <IonList lines="full">
        <IonListHeader>Hjælp</IonListHeader>
        <IonItem button @click="goContact">
          <IonLabel>Kontakt os</IonLabel>
        </IonItem>
        <IonItem button @click="goFAQ">
          <IonLabel>FAQ</IonLabel>
        </IonItem>
        <IonItem button @click="goRate">
          <IonLabel>Bedøm appen</IonLabel>
        </IonItem>
      </IonList>

      <!-- Logout -->
      <div class="logout-wrapper">
        <IonButton expand="block" fill="outline" @click="confirmLogout">
          <IonIcon slot="start" :icon="logOutOutline" />
          Log ud
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonListHeader,
  IonItem, IonLabel, IonButton, IonIcon
} from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';

const router = useRouter();

// navigation helpers
function goEditProfile() {
  router.push({ name: 'EditProfile' });
}
function goAccountSettings() {
  router.push({ name: 'AccountSettings' });
}
function goNotifications() {
  router.push({ name: 'Notifications' });
}
function goHowToUse() {
  router.push({ name: 'HowToUse' });
}
function goTerms() {
  router.push({ name: 'Terms' });
}
function goPrivacy() {
  router.push({ name: 'Privacy' });
}
function goContact() {
  router.push({ name: 'Contact' });
}
function goFAQ() {
  router.push({ name: 'FAQ' });
}
function goRate() {
  console.log('Rate app');
}

// simple confirm for logout
function confirmLogout() {
  const confirmed = window.confirm('Er du sikker på at du vil logge ud?');
  if (confirmed) {
    // your logout logic here
    console.log('Logging out');
    router.replace({ name: 'Login' });
  }
}
</script>

<style scoped>
.logout-wrapper {
  margin-top: 2rem;
  padding: 0 1rem;
}

:deep(ion-list-header) {
  font-size: 1.2rem;
  font-weight: 600;
  color: #02382C; /* dark green */
  margin: 10px 0;
}
</style>
