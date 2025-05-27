// src/composables/useAuth.js
import { ref } from 'vue';

const uid = ref(localStorage.getItem('uid') || 'demoUser');

export function setUid(newUid) {
  uid.value = newUid;
  localStorage.setItem('uid', newUid);
}

export function useAuth() {
  return { uid };
}
