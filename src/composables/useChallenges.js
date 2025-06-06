// src/composables/useChallenges.js
import { ref, computed } from 'vue';
import udfordringer from '@/data/udfordringer.json';
import {
    getActiveChallenges, setActiveChallenges
  } from '@/firebaseRest.js'

const challenges = ref(udfordringer.map(c => ({ ...c, active: false })));
let initialized = false;

async function init(uid) {
  if (!uid || initialized) return;
  initialized = true;
  const savedIds = await getActiveChallenges(uid);
  challenges.value.forEach(c => {
    c.active = savedIds.includes(c.id);
  });
}

async function persist(uid) {
  const ids = challenges.value.filter(c => c.active).map(c => c.id);
  await setActiveChallenges(uid, ids);
}

export function useChallenges(uid) {
  init(uid);

  const startChallenge = async id => {
    const c = challenges.value.find(x => x.id === id);
    if (!c) return;
    c.active = true;
    await persist(uid);
  };

  const cancelChallenge = async id => {
    const c = challenges.value.find(x => x.id === id);
    if (!c) return;
    c.active = false;
    await persist(uid);
  };

  return {
    challenges,
    activeChallenges: computed(() => challenges.value.filter(x => x.active)),
    startChallenge,
    cancelChallenge,
    getChallenge: id => challenges.value.find(x => x.id === id)
  };
}
