import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDVJ82_OcSP7aKgrEGJHnvuW4OJYKVOcBs',
  authDomain: 'instagram-clone-c8823.firebaseapp.com',
  projectId: 'instagram-clone-c8823',
  storageBucket: 'instagram-clone-c8823.appspot.com',
  messagingSenderId: '803963430553',
  appId: '1:803963430553:web:6e84f018f45d0719d3fa08',
};

const projectFirebase = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(projectFirebase);

const projectAuth = getAuth(projectFirebase);

const projectStorage = getStorage(projectFirebase);

export { projectFirestore, projectAuth, projectStorage };
