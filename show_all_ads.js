import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import { firebaseConfig } from "./firebase.js";
import { loadproduct } from "./product_managment.js";



const app = initializeApp(firebaseConfig)
const db = getDatabase();


const adsContent = document.getElementById('adverts_content')


function showallads() {
    const dbref = ref(db)

    get(child(dbref, "Products/"))
        .then((snapshot) => {
            adsContent.innerHTML = ""
            for (const [key, value] of Object.entries(snapshot.val())) {
                // console.log(value)
                loadproduct(value, adsContent, true)
            }

        })
        

        .catch((error) => {
            console.log('No ads')
        })
        
}



export { showallads }