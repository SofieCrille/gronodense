// src/composables/useTasks.js
import { ref, computed } from 'vue';
import opgaver from '@/data/opgaver.json';
import { getActiveTasks, setActiveTasks } from '@/firebaseRest';

// -- module‐scoped, singleton state --
const tasks      = ref(opgaver.map(t => ({ ...t, active: false })));
let _initialized = false;

async function init(uid) {
  if (_initialized || !uid) return;
  _initialized = true;
  const saved = await getActiveTasks(uid);
  tasks.value.forEach(t => {
    t.active = saved.includes(t.id);
  });
}

// -- actions --
async function persist(uid) {
  const activeIds = tasks.value.filter(t => t.active).map(t=>t.id);
  await setActiveTasks(uid, activeIds);
}
async function startTask(uid, id) {
  const t = tasks.value.find(t => t.id === id);
  if (!t) return;
  t.active = true;
  await persist(uid);
}
async function cancelTask(uid, id) {
  const t = tasks.value.find(t => t.id === id);
  if (!t) return;
  t.active = false;
  await persist(uid);
}

// -- public API --
export function useTasks(uid) {
  init(uid);
  return {
    tasks,
    getTask: id => tasks.value.find(t=>t.id===id),
    startTask: id => startTask(uid, id),
    cancelTask:id => cancelTask(uid, id),
    activeTasks: computed(()=>tasks.value.filter(t=>t.active))
  };
}

