/**
 * Created by Deegha on 19/03/2019
 */
const fetch = require("node-fetch")

import {Fire} from './firebase'

const baseUrl = "https://us-central1-forum-79e2c.cloudfunctions.net/"
// const baseUrl = `http://localhost:5000/forum-79e2c/us-central1/`


const POST = async (path, data) => {
  console.log('post', baseUrl+path)
  const result = await fetch(baseUrl+path, {
    method: "POST",
    body: JSON.stringify(data) 
  })
  return await result.json()
}   

const getRef = async (col) => {

  const firebase = await Fire()
  const db = firebase.firestore()
  const ref = db.collection(col)
 
  return ref 
}

// export const fetchFeeds = async () => {

//   const ref = await getRef('feeds')
//   const snapshot = await ref.get()

//   let response = []

//   snapshot.forEach(doc => {
//     response = [...response, {
//       ...doc.data(),
//       id: doc.id
//     }]
//   })
//   return response
// }

export const getLatestComments = async () => {
  try {
    const ref = await getRef('comments')
    const snapshot = await ref.get()

    let response = []

    snapshot.forEach(doc => {
      response = [...response, {
        ...doc.data()
      }]
    })
    return response
  }catch(err) {
    console.log(err)
  }
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

export const checkUserExcists = async(email) => {

  const userRef = await getRef('users')
  const user = await userRef.where('email', '==', email).get()

  let response = []

  user.forEach(doc => {
    response =  [{
      ...doc.data(),
      id: doc.id
    }]
  })

  return response.length > 0 ? response[0] : false
}

export const createNewFeed = async(feed) => {
  try {
    const firebase = await Fire()
    const db = firebase.firestore()
    const response = await db.collection("feeds").doc(feed.id).set(feed)

    return response
  }catch(err) {
    console.log(err)

    throw new Error(err)
  }
}

// export const fetchFeed = async(id) => {
 
  
//   try {
//     const firebase = await Fire()
//     const db = firebase.firestore()
//     const feedRef = db.collection("feeds").doc(id)
//     const feed = await feedRef.get()
 
//     if (feed.exists) {
//       return feed.data()
//     } else {
//       return {} 
//     }

//   }catch(err) {
//     console.log(err)
//   }
// }

export const createComment = async (comment) => {

  try {
    const firebase = await Fire()
    const db = firebase.firestore()
    const response = await db.collection("comments").doc(comment.id).set(comment)
    return response
  }catch(err) {
    console.log(err)

    throw new Error(err)
  }
} 

export const replyComment = async (superparentId, commentTree) => {

  try {
    const firebase = await Fire()
    const db = firebase.firestore()
    const response = await db.collection("comments").doc(superparentId).set(commentTree)

    console.log(response)
    return response
  }catch(err) {
    console.log(err)

    throw new Error(err)
  }
} 

export const getComments = async (feedId) => {

  try {
    const firebase = await Fire()
    const db = firebase.firestore()
    const commentRef = db.collection("comments").where('feedId', '==', feedId)
    const snapshot = await commentRef.get()

    let response = []

    snapshot.forEach(doc => {
      response = [...response, {
        ...doc.data(),
        id: doc.id
      }]
    })
    return response
  }catch(err) {
    console.log(err)
  }
}

export const getUser = async  (id) => {
  try {
    const firebase = await Fire()
    const db = firebase.firestore()
    const user = await db.collection("users").doc(id).get()
    const response = {
      id: user.id,
      ...user.data()
    }

    return response
  }catch(err) {
    console.log(err)
  }
}

export const getUserPosts = async (id) => {
  try {
    const firebase = await Fire()
    const db = firebase.firestore()
    const feedRef = db.collection("feeds").where('auther.id', '==', id)
    const snapshot = await feedRef.get()

    let response = []

    snapshot.forEach(doc => {
      response = [...response, {
        ...doc.data(),
        id: doc.id
      }]
    })
    return response
  }catch(err) {
    console.log(err)
  }
}

export const fetchFeeds = () => POST('getFeeds')

export const getFeedById = (feedId) => POST('getFeedById', {"feedId": feedId}) 

export const like = (data) => POST('likedFeeds', data)

export const removeLike = (data) => POST('removeLike', data)