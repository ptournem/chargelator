import firebase from 'firebase';
var config = {
	apiKey: "AIzaSyCkk4q3IXMzVW6VNyAPaUOqBeWBW_8CYQk",
    authDomain: "chargelator.firebaseapp.com",
    databaseURL: "https://chargelator.firebaseio.com",
    projectId: "chargelator",
    storageBucket: "chargelator.appspot.com",
    messagingSenderId: "130644949448"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
