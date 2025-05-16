<template>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/tabs/shop" />
          </IonButtons>
          <IonTitle>Detaljer</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent class="ion-padding">
        <div class="placeholder-box" />
  
        <h2>{{ product.title }}</h2>
        <h3>{{ product.vendor }}</h3>
        <p>Pris: {{ product.points }} point</p>
        <p>{{ product.description }}</p>
        <IonButton expand="block">Indløs nu</IonButton>
      </IonContent>
    </IonPage>
  </template>
  
  <script>
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton
  } from '@ionic/vue';
  
  export default {
    name: 'ProductDetailView',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonBackButton,
      IonTitle,
      IonContent,
      IonButton
    },
    props: ['id'],
    data() {
      return {
        product: {
          title: '',
          vendor: '',
          points: 0,
          description: ''
        }
      };
    },
    mounted() {
      // temporary in‑memory data
      const all = [
        { id: 1, title: '100 kr gavekort', vendor: 'Odense Velvære', points: 300, description: 'Brug hos Odense Velvære.' },
        { id: 2, title: '50 kr café‑bon',   vendor: 'Café Aroma',    points: 150, description: 'God for en kop kaffe.' }
        // …etc
      ];
      this.product = all.find(p => String(p.id) === this.id) || this.product;
    }
  };
  </script>
  
  <style scoped>
  .placeholder-box {
    width: 100%;
    height: 200px;
    background-color: #ccc;
    border-radius: 4px;
    margin-bottom: 16px;
  }
  </style>
  