// // import firebase from 'firebase/compat/app';
// // import 'firebase/compat/auth';
// // import 'firebase/compat/firestore';


// // const firebaseConfig = {
// //     apiKey: "AIzaSyCXI67H_Fadttt_biD51pu8mXQmWL6aswk",
// //     authDomain: "tv-net-client.firebaseapp.com",
// //     projectId: "tv-net-client",
// //     storageBucket: "tv-net-client.appspot.com",
// //     messagingSenderId: "755681228714",
// //     appId: "1:755681228714:web:d4351e6df12c4efecbddd3",
// //     measurementId: "G-9HZP1EPH4E"
// // };

// // const firebaseApp = firebase.initializeApp(firebaseConfig);
// // const db = firebaseApp.firestore();
// // const auth = firebase.auth();

// // export { auth };
// // export default db;

// import { initializeApp } from 'firebase/app';
// // import { getFirestore } from 'firebase/firestore/lite';
// import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyCXI67H_Fadttt_biD51pu8mXQmWL6aswk",
//     authDomain: "tv-net-client.firebaseapp.com",
//     projectId: "tv-net-client",
//     storageBucket: "tv-net-client.appspot.com",
//     messagingSenderId: "755681228714",
//     appId: "1:755681228714:web:d4351e6df12c4efecbddd3",
//     measurementId: "G-9HZP1EPH4E"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// export const db = getFirestore(firebaseApp);

// // export default db;


import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCXI67H_Fadttt_biD51pu8mXQmWL6aswk",
    authDomain: "tv-net-client.firebaseapp.com",
    projectId: "tv-net-client",
    storageBucket: "tv-net-client.appspot.com",
    messagingSenderId: "755681228714",
    appId: "1:755681228714:web:d4351e6df12c4efecbddd3",
    measurementId: "G-9HZP1EPH4E"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
//const auth = firebase.auth();
// For Google auth
//const provider = new firebase.auth.GoogleAuthProvider();

//export { auth, provider };
export default db;