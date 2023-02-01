import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
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
}


async function getuserrole() {
    const userrole = await get(child(dbref, "users/" + getuseruid()))
        .then((snapshot) => {
             return snapshot.val().role          
    })
    
    .catch((error) => {
        console.log('Cant read role')
    })

    return userrole
}

export { getuseruid, blockuser, getuserrole }