// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD7nOikUnXOFZsJ9RjQV1zR6QeinZXYCnE",
    authDomain: "velvetthunder.firebaseapp.com",
    databaseURL: "https://velvetthunder.firebaseio.com",
    projectId: "velvetthunder",
    storageBucket: "velvetthunder.appspot.com",
    messagingSenderId: "331828073337",
    appId: "1:331828073337:web:da8d442072381ba0acd5a8",
    measurementId: "G-7VF5JQB1EW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize Firestore
var db = firebase.firestore();
