import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { useron } from "./UserON.js";
import { useroff } from "./UserOFF.js";
import { registeruser } from "./register_user.js";
import { loginuser } from "./login_user.js";

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in')
        useron()
    } 
    
    else {
        console.log('User is signed out')
        useroff()
        loginuser()
        registeruser()
    }
});



