<template>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton default-href="/tabs/shop"/></IonButtons>
          <IonTitle>Category: {{ category }}</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent fullscreen class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol
              v-for="item in filtered"
              :key="item.id"
              size="12" size-sm="6" size-md="4"
            >
              <IonCard button @click="openDetail(item.id)">
                <IonCardHeader>
                  <IonCardTitle>{{ item.title }}</IonCardTitle>
                  <IonCardSubtitle>{{ item.vendor }}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <strong>{{ item.points }} pts</strong>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
    IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
  } from '@ionic/vue';
  
  const route = useRoute();
  const router = useRouter();
  
  // reconstruct or import the same rewards array
  const rewards = [
    { id: 1, title: '100 kr gavekort', vendor: 'Odense Velvære', points: 300, category: 'gift-card' },
    { id: 2, title: '50 kr café-bon',   vendor: 'Café Aroma',    points: 150, category: 'food' },
    // …etc.
  ];
  
  const category = route.params.category;
  
  // only show items matching the category
  const filtered = computed(() =>
    rewards.filter(r => r.category === category)
  );
  
  function openDetail(id) {
    router.push({ name: 'ProductDetail', params: { id } });
  }
  </script>
  