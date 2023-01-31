import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, update, ref, get, child, remove, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { firebaseConfig } from "./firebase.js";



const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()


function registeruser() {
    const registerNewUser = () => {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
    
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
    
            const timestamp = new Date()
            set(ref(database, 'users/' + user.uid),{
                user_email: email,
                role: 'simple_user',
                timestamp: `${timestamp}`,
            })
    
            console.log('New User Created')
            
        })
    
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            alert('User exist')
        });
    }
    document.getElementById('signUp').addEventListener('click', registerNewUser)
}

export { registeruser }

