<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Profil</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <p>Velkommen til Profil‑fanen!</p>
    </IonContent>
  </IonPage>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/vue';

export default {
  name: 'HjemView',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent }
};
</script>
