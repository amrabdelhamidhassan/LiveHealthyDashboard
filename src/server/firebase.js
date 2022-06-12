import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDuOLOzodXvVMAg7gvSiJMDxhx00A9uimY",
    authDomain: "livehealthy-a27a2.firebaseapp.com",
    projectId: "livehealthy-a27a2",
    storageBucket: "livehealthy-a27a2.appspot.com",
    messagingSenderId: "853046217725",
    appId: "1:853046217725:web:9d2c4e0c6a960638956794",
    measurementId: "G-B605TMQPFW"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export {auth , firebase};