
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from '../config/config'

import request from 'superagent'

let format = async (feeds,feed, likes, liked) => ({
  id: feed,
  location: feeds[feed].location?feeds[feed].location:null,
  createdAt: feeds[feed].createdAt,
  postText: feeds[feed].postText,
  postMedia: {
    // type: feeds[feed].postMedia.type && feeds[feed].postMedia.type,
    url: feeds[feed].postMedia && feeds[feed].postMedia.url && feeds[feed].postMedia.url
  },
  userObj: {
    id: feeds[feed].userObj && feeds[feed].userObj.userID,
    name: feeds[feed].userObj && feeds[feed].userObj.displayName,
    image: feeds[feed].userObj && feeds[feed].userObj.image
  },
  category: feeds[feed].category?feeds[feed].category:'open',
  currentUserLiked: liked,
  voteUp: likes
}) 


export const formatFeeds = async (feeds, db, userId) => { 
  
  const formated = Object.keys(feeds).map( async (feed) => { 

    let likes = null
    let liked = false

    const response = db
      .ref("likes")
      .orderByKey()
      .equalTo(feed)
      .once("value") 
    
    return response.then( async (likesSnapshot) => {
      if(likesSnapshot.val()) {

        const la = likesSnapshot.val()

        if(userId) {
          Object.keys(la[feed]).map(likeUser => {
            if(likeUser === userId) {
              liked = true
            }
          })
        }

        likes = Object.keys(la[feed]).length
        return await format(feeds, feed, likes, liked)
      }else {
        likes = 0
        return await format(feeds, feed, likes, liked)
      }
    })
    .then(respone => respone)
    .catch(err => console.log(err))
  })

  return Promise.all(formated).then(item => item)  
}


export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}


export const trackPageView = (url) => {
  try {
    window.gtag('config', 'UA-139535555-1', {
      page_location: url
    });
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
}


export const makeid = (length) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))  

  return text+Date.now();
}

export const uploadImage = async (file) => {
  try{
    let response = await request
    .post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    .field('folder', 'statedee')
    .field('file', file)

    if(response.body){
      return response.body.secure_url
    }else {
      return ""
    }
  }catch(err) {
    console.log(err)
    return ""
  }
}