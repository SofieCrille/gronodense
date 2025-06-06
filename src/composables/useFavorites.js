
import { ref, onMounted } from 'vue';
import { getFavorites, setFavorites } from '@/firebaseRest.js';

const favorites = ref([]);
let initialized = false;

export function useFavorites(uid) {
  async function load() {
    if (!uid || initialized) return;
    initialized = true;
    try {
      favorites.value = (await getFavorites(uid)) || [];
    } catch {
      favorites.value = [];
    }
  }

  async function toggle(id) {
    const idx = favorites.value.indexOf(id);
    if (idx >= 0) favorites.value.splice(idx, 1);
    else favorites.value.push(id);
    await setFavorites(uid, favorites.value);
  }

  onMounted(load);

  return {
    favorites,
    toggleFavorite: toggle,
    reloadFavorites: load
  };
}