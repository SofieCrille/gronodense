<!-- src/components/CardComponent.vue -->
<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ title }}</ion-card-title>
        <ion-card-subtitle v-if="subtitle">{{ subtitle }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <slot>
          {{ content }}
        </slot>
  
        <!-- move the button here instead -->
        <ion-button
          v-if="buttonText"
          expand="block"
          fill="outline"
          class="card-button"
          @click="$emit('button-click')"
        >
          {{ buttonText }}
        </ion-button>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup>
  import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton
  } from '@ionic/vue';
  
  const props = defineProps({
    title:      { type: String, required: true },
    subtitle:   { type: String, default: '' },
    content:    { type: String, default: '' },
    buttonText: { type: String, default: '' }
  });
  
  defineEmits(['button-click']);
  </script>
  
  <style scoped>
  .card-button {
    margin-top: 1rem;
  }
  </style>
  