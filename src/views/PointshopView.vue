<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Point Shop</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <IonGrid>
        <IonRow>
          <IonCol
            v-for="item in rewards"
            :key="item.id"
            size="12" size-sm="6" size-md="4"
          >
            <!-- routerLink + click handler to blur before nav -->
            <IonCard
              :routerLink="{ name: 'ProductDetail', params: { id: item.id } }"
              routerDirection="forward"
              @click.native="blurLink"
            >
              <div class="placeholder-box" />

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

<script>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard,
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
} from '@ionic/vue';

export default {
  name: 'PointshopView',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
  },
  data() {
    return {
      rewards: [
        { id: 1, title: '100 kr gavekort', vendor: 'Odense Velvære', points: 300 },
        { id: 2, title: '50 kr café-bon',   vendor: 'Café Aroma',    points: 150 }
      ]
    };
  },
  methods: {
    blurLink(event) {
      // remove focus from the <a> before Ionic hides the page
      event.currentTarget.blur();
    }
  }
};
</script>

<style scoped>
.placeholder-box {
  width: 100%;
  height: 150px;
  background-color: #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
}
</style>
