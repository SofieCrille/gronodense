<!-- src/views/CategoryListView.vue -->
<template>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/shop" />
          </IonButtons>
          <IonTitle>{{ categoryNames[category] || category }}</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent class="ion-padding">
        <div class="cards-vertical">
          <IonCard
            v-for="item in filtered"
            :key="item.id"
            :routerLink="{ name: 'ProductDetail', params: { id: item.id } }"
            routerDirection="forward"
            class="category-card"
          >
            <div class="placeholder-box" />
            <IonCardHeader class="card-header">
              <IonCardTitle>{{ item.title }}</IonCardTitle>
              <IonCardSubtitle>{{ item.vendor }}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <strong>{{ item.points }} pts</strong>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonContent,
    IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent
  } from '@ionic/vue';
  
  const route    = useRoute();
  const category = route.params.category;
  
  // your same rewards array or import from shared module
  const rewards = [
    { id: 1, title: '50 kr rabat',           vendor: 'Butik Cirkel',     points: 200, category: 'trending' },
    { id: 2, title: '100 kr gavekort',       vendor: 'Odense Velvære',   points: 300, category: 'skonhed' },
    { id: 3, title: '30% mode & accessoirer',vendor: 'Modehuset',       points: 250, category: 'skonhed' },
    { id: 4, title: '20 kr café-bon',        vendor: 'Café Aroma',       points: 150, category: 'mad' },
    { id: 5, title: 'Biografbillet',         vendor: 'Cinema City',      points: 220, category: 'oplevelser' },
    // …etc.
  ];
  
  const filtered = computed(() =>
    rewards.filter(r => r.category === category)
  );
  
  const categoryNames = {
    trending:    'Trending',
    skonhed:     'Skønhed & mode',
    mad:         'Mad & drikke',
    oplevelser:  'Oplevelser'
  };
  </script>
  
  <style scoped>
  .cards-vertical {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .category-card {
    width: 100%;
    border-radius: 12px;
    box-sizing: border-box;
  }
  .placeholder-box {
    width: 100%;
    height: 120px;
    background-color: #ccc;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    margin-bottom: 8px;
  }
  .card-header {
    position: relative;
  }
  </style>
  