import { firebase } from "@firebase/app";

let firebaseConfig = {
  apiKey: "AIzaSyCVyDhf4DAKYPItIKr06kgmV2Rxox-odTQ",
  authDomain: "squared-squirrel.firebaseapp.com",
  databaseURL: "https://squared-squirrel.firebaseio.com",
  projectId: "squared-squirrel",
  storageBucket: "squared-squirrel.appspot.com",
  messagingSenderId: "924194976954",
  appId: "1:924194976954:web:62ffa93c23e4162f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
