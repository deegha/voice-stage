

export const sc = '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'


const isProduction = process.env.NODE_ENV === 'production'

let fconfig = {}
if(isProduction) {
  fconfig = {
    apiKey: 'AIzaSyAse4I7_o7IZ9vF0asjmoZ2u9rGWuRApZ4',
    authDomain: 'forum-79e2c.firebaseapp.com',
    databaseURL: 'https://forum-79e2c.firebaseio.com',
    projectId: 'forum-79e2c',
    storageBucket:'',
    messagingSenderId: '986660355532',
  }
}else {
  fconfig = {
    apiKey: "AIzaSyD07FJHUlaK4DFCvWzXd3DhiclcrUl8SKs",
    authDomain: "forum-stg-427a3.firebaseapp.com",
    databaseURL: "https://forum-stg-427a3.firebaseio.com",
    projectId: "forum-stg-427a3",
    storageBucket: "forum-stg-427a3.appspot.com",
    messagingSenderId: "309192930839",
    appId: "1:309192930839:web:fd97d6c8ab11be73"
  }
}

console.log(isProduction, "isProduction")

export const firebaseConfig = fconfig


