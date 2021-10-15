// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, doc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { createApp } from "https://unpkg.com/petite-vue?module"
import { signInAnonymously, getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyA0Po6BW0ZCn5d-0rqmThAfXL9obiwgieo",

    authDomain: "house-of-kirresh-registry.firebaseapp.com",

    projectId: "house-of-kirresh-registry",

    storageBucket: "house-of-kirresh-registry.appspot.com",

    messagingSenderId: "537232036324",

    appId: "1:537232036324:web:ed0a3e4a02a182e3a9b7f1"

};





// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'it';

const db = getFirestore()

export function start() {
    signInAnonymously(auth)
        .then(() => {
            createApp({
                firstName: '',
                fatherName: '',
                grandfatherName: '',
                greatGrandfatherName: '',
                phoneNumber: '',
                underageChildren: '',
                yearOfBirth: '',   
                notes: '',

                saveMember() {
                    let person = {
                        firstName: this.firstName,
                        fatherName: this.fatherName,
                        grandfatherName: this.grandfatherName,
                        greatGrandfatherName: this.greatGrandfatherName,
                        yearOfBirth: this.yearOfBirth,
                        phoneNumber: this.phoneNumber,
                        underageChildren: this.underageChildren.split("\n"),
                        notes: this.notes

                    }
                    setDoc(doc(db, "family-members", `${this.phoneNumber}`), person);
                    this.firstName = ''
                    this.fatherName = ''
                    this.grandfatherName = ''
                    this.greatGrandfatherName=  ''
                    this.phoneNumber= ''
                    this.underageChildren= ''
                    this.yearOfBirth= ''
                    this.notes = ''
                },
             
            }).mount('#add-family-member-form')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });

}