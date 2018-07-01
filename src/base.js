import Rebase from "re-base";
import firebase from "firebase";

//create Firebase app
const firebaseApp = firebase.initializeApp({
   apiKey: "AIzaSyDmmKbGm4j92A3EM5kEkHhz9-2i9a5_DUU",
   authDomain: "catch-of-the-day-asakasamo.firebaseapp.com",
   databaseURL: "https://catch-of-the-day-asakasamo.firebaseio.com"
});

//create rebase binding
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;