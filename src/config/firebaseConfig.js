import firebase from 'firebase'

const firebaseConfig = {
      apiKey: "AIzaSyCSs6rYpV27mt6lgd5CFki5AvXsbnv5XjI",
      authDomain: "mypodcast-613d5.firebaseapp.com",
      databaseURL: "https://mypodcast-613d5.firebaseio.com",
      projectId: "mypodcast-613d5",
      storageBucket: "mypodcast-613d5.appspot.com",
      messagingSenderId: "888997821583",
      appId: "1:888997821583:web:822ba41c9e9cf9cb5104fa",
      measurementId: "G-HJZP8H05T2"
    };

firebase.initializeApp(firebaseConfig)

export default firebase;