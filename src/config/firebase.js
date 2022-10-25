import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { addDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { collection, getDocs, getFirestore, where, onSnapshot, query, deleteDoc, doc, setDoc } from "firebase/firestore";

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

//firestore
export const db = getFirestore(app);

export async function saveOnFirestore(data) {
  await setDoc(doc(db, "logins", data.id), {
      password: data.password,
      service: data.service,
      userId: data.userId,
      username: data.username
  })  //(collection(db, "logins"), data)
      .then(() => {
          console.log("dados salvos!");
      }).catch((error) => {
          console.log(error);
      });
}

export async function dataLogins(idUser) {
  // await com onSnapshot?
  // onSnapshot: sempre que o conteúdo muda, outra chamada atualiza o snapshot do documento
  console.log("entrou no dataLogins idUser:", idUser);

  const dataLogins = await (getDocs(query(collection(db, "logins")), where("userId", "==", idUser)))
    .then(res => {
      const logins = res.docs.map(doc => ({
        id: doc.id,
        service: doc.data().service,
        password: doc.data().password,
        username: doc.data().username,
        userId: doc.data().userId
      }))
      return logins;
    }).catch(error => console.log(error));

  return dataLogins;
  // console.log(dataLogins);
}

export async function loginsDatabase() {
  console.log("entrou no loginsDatabase no firebase");
  const data = await getDocs(collection(db, "logins"))
    .then(res => {
      const logins = res.docs.map(doc => ({
        id: doc.id,
        service: doc.data().service,
        password: doc.data().password,
        username: doc.data().username,
        userId: doc.data().userId
      }))
      // setDadosBanco(logins);
      // console.log(logins);
      return logins;
    }).catch(error => console.log(error));

  return data;
  // console.log(querySnapshot);
}

export async function deleteLogin(id){
  await deleteDoc(doc(db, "logins", id))
  .then(() => { console.log("Login excluído com sucesso!") }) 
  .catch(error => { console.log(error); });
}

// export async function loginsByUser() {
//   const q = query(collection(db, "logins"), where("userId", "==", '0CWZ413LmlT72NCTIrL7p2N6Xph2'));

//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// }


