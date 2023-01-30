


 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { firebaseConfig } from "./firebase.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries


import { getuseruid } from "./user_managment.js";

 // Your web app's Firebase configuration


 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { fill_admin_product } from "./user_roles/load_admin_page.js";
 
const db = getDatabase();


let enterID = document.getElementById("enterID")
let enterName = document.getElementById("enterName")
let enterQuantity = document.getElementById("enterQuantity")
let findID = document.getElementById("findID")
let findData = document.getElementById("findData")

let enterPrice = document.getElementById("enterPrice")
let enterDescription = document.getElementById("enterDescription")
let enterPhoto = document.getElementById("enterPhoto")

let insertBtn = document.getElementById("insert")
let updateBtn = document.getElementById("update")
let removeBtn = document.getElementById("remove")
let findBtn = document.getElementById("find")

function display_comment_button(product, appendproduct) {
    const commentButton = document.createElement('button')
    commentButton.textContent = 'Comment'
    remove_product_button.id = 'comment' + product.ID
    remove_product_button.classList.add('btn', 'btn-primary')
    appendproduct.appendChild(commentButton)

}

function insert_comment(productId, comment)
{

}

function delete_comment(productId, commentId)
{
}

