// src/composables/useAuth.js
import { ref } from 'vue';

// you’d normally wire this up to Firebase Auth onAuthStateChanged…
const uid = ref(localStorage.getItem('uid') || 'demoUser');

// example setter in case you log in somewhere else:
export function setUid(newUid) {
  uid.value = newUid;
  localStorage.setItem('uid', newUid);
}

export function useAuth() {
  return { uid };
}
