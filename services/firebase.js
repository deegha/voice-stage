// import firebase from 'firebase'
// import { firebaseConfig } from "./fireConfig"

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default firebase


import { firebaseConfig } from "./fireConfig"

export const Fire  = async () => {
  const firebase = await import('firebase')
  
  try {
    firebase.initializeApp(firebaseConfig)
  } catch (err) {

    // console.log(err)
    // if (!/already exists/.test(err.message)) {
    //   console.error('Firebase initialization error : ', err.stack)
    // }
  }

  return firebase
}

