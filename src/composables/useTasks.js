// src/composables/useTasks.js
import { ref, computed } from 'vue';
import opgaver from '@/data/opgaver.json';
import {
  getActiveTasks,
  setActiveTasks,
  getCompletedTasks,
  setCompletedTasks,
  addPoints
} from '@/firebaseRest';

// -- module-scoped, singleton state --
const tasks = ref(
  opgaver.map(t => ({ ...t, active: false, completed: false, _claimed: false }))
);
let _initialized = false;

async function init(uid) {
  if (_initialized || !uid) return;
  _initialized = true;
  const [savedActive, savedCompleted] = await Promise.all([
    getActiveTasks(uid),
    getCompletedTasks(uid)
  ]);

  tasks.value.forEach(t => {
    t.active = savedActive.includes(t.id);
    t.completed = savedCompleted.includes(t.id);
  });
}

// -- persistence helpers --
async function persistActive(uid) {
  const activeIds = tasks.value.filter(t => t.active).map(t => t.id);
  await setActiveTasks(uid, activeIds);
}
async function persistCompleted(uid) {
  const completedIds = tasks.value.filter(t => t.completed).map(t => t.id);
  await setCompletedTasks(uid, completedIds);
}

// -- actions --
async function startTask(uid, id) {
  const t = tasks.value.find(t => t.id === id);
  if (!t) return;
  t.active = true;
  await persistActive(uid);
}

async function cancelTask(uid, id) {
  const t = tasks.value.find(t => t.id === id);
  if (!t) return;
  t.active = false;
  await persistActive(uid);
}

async function completeTask(uid, id) {
  const t = tasks.value.find(t => t.id === id);
  if (!t) return;
  t.active = false;
  t.completed = true;
  await Promise.all([
    persistActive(uid),
    persistCompleted(uid)
  ]);
}

async function claimReward(uid, id) {
  const t = tasks.value.find(t => t.id === id);
  if (!t || !t.completed || t._claimed) return;
  await addPoints(uid, t.points);
  t._claimed = true;

  // **Here’s the key change**:
  // Remove the completed flag so the task returns to inactive
  t.completed = false;
  // Persist the updated completed list back to DB
  await persistCompleted(uid);
}

// -- public API --
export function useTasks(uid) {
  init(uid);
  return {
    tasks,
    getTask: id => tasks.value.find(t => t.id === id),
    startTask:    id => startTask(uid, id),
    cancelTask:   id => cancelTask(uid, id),
    completeTask: id => completeTask(uid, id),
    claimReward:  id => claimReward(uid, id),
    activeTasks:    computed(() => tasks.value.filter(t => t.active)),
    completedTasks: computed(() => tasks.value.filter(t => t.completed)),
    inactiveTasks:  computed(() =>
      tasks.value.filter(t => !t.active && !t.completed)
    )
  };
}
