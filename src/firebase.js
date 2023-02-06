// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAUPBr7vfY_Y_-YYuVYV7H6zIu8IjJ2u1o",
//   authDomain: "linkedin-clone-6c9be.firebaseapp.com",
//   projectId: "linkedin-clone-6c9be",
//   storageBucket: "linkedin-clone-6c9be.appspot.com",
//   messagingSenderId: "416276111536",
//   appId: "1:416276111536:web:9ff60b394876a2422f5b75"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// const auth = getAuth(firebaseApp);
// const provider = new GoogleAuthProvider(firebaseApp);
// const storage = getStorage(firebaseApp);


// export { auth, provider, storage };
	
// export default db;

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUPBr7vfY_Y_-YYuVYV7H6zIu8IjJ2u1o",
  authDomain: "linkedin-clone-6c9be.firebaseapp.com",
  projectId: "linkedin-clone-6c9be",
  storageBucket: "linkedin-clone-6c9be.appspot.com",
  messagingSenderId: "416276111536",
  appId: "1:416276111536:web:9ff60b394876a2422f5b75"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, provider, storage};
	
export default db;