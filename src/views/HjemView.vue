<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Hjem</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Make sure this is here! -->
      <CardComponent
        title="Velkommen"
        subtitle="Start din dag"
        content="Her kan du se dagens udfordringer, pointbalance, og andre vigtige oplysninger."
        button-text="Se detaljer"
        @button-click="onDetailsClick"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import CardComponent from '@/components/CardComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function onDetailsClick() {
  // example navigation
  router.push('/tabs/udfordringer')
}
</script>
