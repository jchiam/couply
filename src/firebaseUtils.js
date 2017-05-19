import * as firebase from 'firebase';

// initialize firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE
};
firebase.initializeApp(config);

export const firebaseDB = firebase.database();
export const firebaseStorage = firebase.storage();
