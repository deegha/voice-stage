/**
 * Created by Deegha on 19/03/2019
 */
const fetch = require("node-fetch")

import {Fire} from './firebase'

// const baseUrl = "https://us-central1-like-me-65680.cloudfunctions.net/"
// const baseUrl = "http://localhost:5000/like-me-65680/us-central1/"

const getRef = async (col) => {

  const firebase = await Fire()
  const db = firebase.firestore()
  const ref = db.collection(col)
 
  return ref 
}

export const fetchFeeds = async () => {

  const ref = await getRef('feeds')
  const snapshot = await ref.get()

  let response = []

  snapshot.forEach(doc => {
    response = [...response, {
      ...doc.data(),
      id: doc.id
    }]
  })
  return response
}

export const createUser = async (user) => {

  try {
    const firebase = await Fire()
    const db = firebase.firestore()
    const userRef = await db.collection("users").add(user)

    const ref = db.collection('users').doc(userRef.id)
    const userData = await ref.get()

    return {
      ...userData.data(),
      id: userRef.id
    }
  }catch(err) {
    console.log(err)

    return false
  }
}