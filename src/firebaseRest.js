// src/firebaseRest.js

const BASE_URL = 'https://gronodense-default-rtdb.europe-west1.firebasedatabase.app';

// FAVORITES
export async function getFavorites(uid) {
  const res = await fetch(`${BASE_URL}/users/${uid}/favorites.json`);
  if (!res.ok) throw new Error('Failed to fetch favorites');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function setFavorites(uid, favorites) {
  const res = await fetch(
    `${BASE_URL}/users/${uid}/favorites.json`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(favorites)
    }
  );
  if (!res.ok) throw new Error('Failed to save favorites');
  return res.json();
}

// BALANCE (POINTS SYSTEM)
export async function getBalance(uid) {
  const res = await fetch(`${BASE_URL}/users/${uid}/balance.json`);
  if (!res.ok) throw new Error('Failed to fetch balance');
  const data = await res.json();
  return typeof data === 'number' ? data : 150;
}

export async function changeBalance(uid, delta) {
  // fetch current balance
  const current = await getBalance(uid);
  const next = current + delta;
  if (next < 0) throw new Error('Insufficient points');

  const res = await fetch(
    `${BASE_URL}/users/${uid}/balance.json`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next)
    }
  );
  if (!res.ok) throw new Error('Failed to update balance');
  return next;
}