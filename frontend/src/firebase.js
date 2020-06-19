import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBBIX-62p8H4BJAW2aJreU6P4HOPRu0-rg",
    authDomain: "river-b0a17.firebaseapp.com",
    databaseURL: "https://river-b0a17.firebaseio.com",
    projectId: "river-b0a17",
    storageBucket: "river-b0a17.appspot.com",
    messagingSenderId: "595711963843",
    appId: "1:595711963843:web:837960ad3e0f3bc93ae876",
    measurementId: "G-RE288EKW8Z"
  };
  firebase.initializeApp(config);
  //export const auth = firebase.auth;
  //export const db = firebase.database();
  export default firebase;