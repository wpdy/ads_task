import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, update, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()



function loginuser() {
    const loginUser = () => {
        const login_email = document.getElementById('login_email').value
        const login_password = document.getElementById('login_password').value
    
        signInWithEmailAndPassword(auth, login_email, login_password)
            .then((userCredential) => {
            // Login in 
            const user = userCredential.user;
            const loginTime = new Date()
            update(ref(database, 'users/' + user.uid), {
                last_login: loginTime
            })
            console.log('Login successful!')
            location.reload();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }
    document.getElementById('signIn').addEventListener('click', loginUser)
}

export { loginuser }