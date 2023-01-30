

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, update, ref, get, child, remove, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { firebaseConfig } from "./firebase.js";




const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const dbref = ref(database)
const auth = getAuth()


function getuseruid() {
    let user = auth.currentUser
    return user.uid
}

function blockuser(userid) {
    console.log(userid, "BLOCKED")
    // getAuth()
    //     .updateProfile(userid, {
    //     disabled: true,
    //     })
    //     .then((userRecord) => {
    //         console.log('Successfully blocked user', userRecord.toJSON());
    //     })
    //     .catch((error) => {
    //         console.log('Error blocking user:', error);
    //     });
}



async function getuserrole() {

    const userrole = await get(child(dbref, "users/" + getuseruid()))
        .then((snapshot) => {
             return snapshot.val().role          
    })
    
    .catch((error) => {
        alert(error)
    })

    return userrole

}

export { getuseruid, blockuser, getuserrole }