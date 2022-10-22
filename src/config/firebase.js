import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { addDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { collection, getDocs, getFirestore, where, onSnapshot, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// //firestore
export const db = getFirestore(app);

// Get a list of cities from your database
export async function getLogins(db) {
  const loginsCol = collection(db, 'logins');
  const loginSnapshot = await getDocs(loginsCol);
  const loginList = loginSnapshot.docs.map(doc => doc.data());
  return loginList;
};

export async function dataLogins() {
  const querySnapshot = await getDocs(collection(db, "logins"))
    .then(res => {
      const logins = res.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      return logins;
    });

  return querySnapshot;
  // console.log(querySnapshot);
}


// const logins = await getDocs(collection(db, "logins"));
  // const q = query(collection(db, "logins"));
  // const data = onSnapshot(q, (querySnapshot) => {
  //   // const cities = [];
  //   querySnapshot.docs.map(doc => {
  //     return {
  //       id: doc.id,
  //       ...doc.data().password
  //     }
  //   });

  // })

  //  return console.log(data);


// const firestore = getFirestore();

// const loginsCollection = doc(firestore, "logins");

// //adicionar dados de login:
// async function addNewLogin() {
//   const newDoc =  await addDoc(loginsCollection, {
//     idUser: 'id3324',
//     service: 'Linkedin',
//     username: "juliahpm",
//     password: '454151'
//   })
//     .then(() => {
//       //não chama se estiver offline
//       console.log(`Documento criado na pasta:${newDoc.path}`)
//     })
//     .catch((error) => {
//       console.log(`Erro: ${error}`);
//     }); //merge vai atualizar o documento se ele já existir
// }
// addNewLogin();

//ler dado
// async function readOneLogin(){
//   const logins = await getDoc(doc(loginsCollection, "id"));
//   if(logins.exists()){
//     const docData = logins.data();
//     console.log(`Dados login: ${JSON.stringify(docData)}`);
//   }
// }





// setDoc(pathToWrite, docData, { merge: true })
//     .then(() => {
//       //não chama se estiver offline
//       console.log("Login cadastrado/atualizado!")
//     })
//     .catch((error) => {
//       console.log(`Erro: ${error}`);
//     }); //merge vai atualizar o documento se ele já existir
// }