import loadDB from "./firebase"

class FeedStore {

  loadFeed = async (id) => {
    const db = await loadDB()
    const snapshot = await db.ref("feeds").once('value')
    const feedsByGeo = snapshot.val()

    let feed = {}

    Object.keys(feedsByGeo).map(index => {
      Object.keys(feedsByGeo[index]).map( i => {
        if(i === id) {
          feed =  {
            ...feedsByGeo[index][i],
            id
          }
        }
      })
    })
    return feed
  }
}

const feedStore = new FeedStore
export default feedStore