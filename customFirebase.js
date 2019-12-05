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

// Initialize User Authentication catching
var currentUser;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        currentUser = user;

        if (!db.collection("Users").doc(currentUser.uid)) {
            db.collection("Users").doc(currentUser.uid).set(currentUser, {merge: true})
                .then(function () {
                    console.log("Successfully initiated user info on Firebase.")
                })
                .catch(function () {
                    console.log("Error while initiating user info on Firebase.")
                });
        }
    } else {
        // User is signed out.
        alert("You're signed out!");
        window.open('https://velvetthunder.firebase.com/login/')
    }
});

try {
    document.getElementById('logout').onclick = function() {
        firebase.auth().signOut()
            .then(function() {
                console.log('Logged out.');
                window.open('..', '_self');
            })
            .catch(function(error) {
                console.log(error);
                window.open('..', '_self');
            });
    }
} catch {
    console.log('Could not set up logout button');
}
