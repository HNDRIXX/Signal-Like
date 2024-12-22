
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCq5U_5WzJrlgNnHGq8XcI0v8F2GniN5r0",
    authDomain: "hndrx-app.firebaseapp.com",
    projectId: "hndrx-app",
    storageBucket: "hndrx-app.appspot.com",
    messagingSenderId: "305141103659",
    appId: "1:305141103659:web:5a265d3cc2b21c2cac3e6e",
    measurementId: "G-Z64K10VVCP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
