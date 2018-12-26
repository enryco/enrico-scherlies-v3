import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyASnhNQUB43ry1e1rw8pQStIDPuju1uGBM",
  authDomain: "enryco-website.firebaseapp.com",
  databaseURL: "https://enryco-website.firebaseio.com",
  projectId: "enryco-website",
  storageBucket: "enryco-website.appspot.com",
  messagingSenderId: "1079771764554"
}


const firebaseApp = firebase.initializeApp(config)

export default firebaseApp
