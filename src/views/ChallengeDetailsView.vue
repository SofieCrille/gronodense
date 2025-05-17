<template>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/tabs/hjem" />
          </IonButtons>
          <IonTitle>Opgave Detaljer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h2>{{ challenge.title }}</h2>
        <p>{{ challenge.description }}</p>
      </IonContent>
    </IonPage>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/vue';
  
  const route = useRoute();
  const challenge = ref({ title: '', description: '' });
  
  onMounted(() => {
    const all = {
      transport: { title: 'Bæredygtig transport', description: 'Tag cyklen…' },
      affald:    { title: 'Affaldssortering',       description: 'Lær at sortere…' }
    };
    const id = route.params.id;
    if (all[id]) challenge.value = all[id];
  });
  </script>
  