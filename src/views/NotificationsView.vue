
<script setup>
import { ref, computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem } from '@ionic/vue';

const allNotifications = ref([
  { id: 1, title: 'Velkommen!', body: 'Tak for at tilmelde dig.', date: new Date(), read: false },
]);

const segment = ref('unread');

const unreadNotifications = computed(() => allNotifications.value.filter(n => !n.read));
const pastNotifications   = computed(() => allNotifications.value.filter(n => n.read));

function formatDate(d) {
  return d.toLocaleString('da-DK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tabs/hjem" />
        </IonButtons>
        <IonTitle>Notifikationer</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonSegment v-model="segment" scrollable>
        <IonSegmentButton value="unread">
          <IonLabel>Ulæste</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="past">
          <IonLabel>Tidligere</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <IonList v-if="segment === 'unread'">
        <IonItem v-for="note in unreadNotifications" :key="note.id">
          <IonLabel>
            <h3>{{ note.title }}</h3>
            <p>{{ note.body }}</p>
            <small>{{ formatDate(note.date) }}</small>
          </IonLabel>
        </IonItem>
        <IonItem v-if="!unreadNotifications.length">
          <IonLabel>Ingen ulæste notifikationer.</IonLabel>
        </IonItem>
      </IonList>
      <IonList v-if="segment === 'past'">
        <IonItem v-for="note in pastNotifications" :key="note.id">
          <IonLabel>
            <h3>{{ note.title }}</h3>
            <p>{{ note.body }}</p>
            <small>{{ formatDate(note.date) }}</small>
          </IonLabel>
        </IonItem>
        <IonItem v-if="!pastNotifications.length">
          <IonLabel>Ingen tidligere notifikationer.</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-segment {
  margin: 1rem;
}
</style>
