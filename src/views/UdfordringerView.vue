<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Udfordringer</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <p>Velkommen til Udfordringer‑fanen!</p>
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
