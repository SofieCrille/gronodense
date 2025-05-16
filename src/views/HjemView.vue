<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Hjem</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <p>Velkommen til Hjem‑fanen!</p>
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
