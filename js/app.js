
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyByOvQPg6j8snpk2k3B8RYeWOz7zfOauqQ",
    authDomain: "jobdelas-62306.firebaseapp.com",
    databaseURL: "https://jobdelas-62306.firebaseio.com",
    projectId: "jobdelas-62306",
    storageBucket: "jobdelas-62306.appspot.com",
    messagingSenderId: "1013054938950",
    appId: "1:1013054938950:web:e39df96862a34bc5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database().ref('Usuarios');