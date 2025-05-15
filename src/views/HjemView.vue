<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Hjem</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Make sure this is here! -->
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function onDetailsClick() {
  // example navigation
  router.push('/tabs/udfordringer')
}
</script>
