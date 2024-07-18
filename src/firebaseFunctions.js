import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

export const initializeFirebase = (config) => {
  const app = initializeApp(config);
  const db = getFirestore(app);
  const functions = getFunctions(app);

  return { app, db, functions };
};
