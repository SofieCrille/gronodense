<template>
  <IonPage>
    <!-- Header -->
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tabs/hjem" />
        </IonButtons>
        <IonTitle>Notifikationer</IonTitle>
      </IonToolbar>
    </IonHeader>

    <!-- Content with segment -->
    <IonContent>
      <IonSegment v-model="segment" scrollable>
        <IonSegmentButton value="unread">
          <IonLabel>Ulæste</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="past">
          <IonLabel>Tidligere</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <!-- Unread notifications -->
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

      <!-- Past notifications -->
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

<script setup>
import { ref, computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem } from '@ionic/vue';

// dummy data for demonstration
const allNotifications = ref([
  { id: 1, title: 'Velkommen!', body: 'Tak for at tilmelde dig.', date: new Date(), read: false },
  // … more
]);

// segment state: 'unread' or 'past'
const segment = ref('unread');

// separate lists
const unreadNotifications = computed(() => allNotifications.value.filter(n => !n.read));
const pastNotifications   = computed(() => allNotifications.value.filter(n => n.read));

// helper to format
function formatDate(d) {
  return d.toLocaleString('da-DK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
</script>

<style scoped>
/* ensure segment sticks */
ion-segment {
  margin: 1rem;
}
</style>
