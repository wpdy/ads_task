//To Do:
//sutvarkyti update, kad updatintu tik to userio skelbimus kuris yra prisijunges, ir ivedus kitoki produkto koda nesukurtu naujo skelbimo
//sutvarkyti update mygtuka, kad jei iveda neteisinga koda mestu alert()
//suzinoti ar remove mygtuko reikia ar ne arba remove gali buti kad removina tik viena skelbima






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

function get_product_categories() {
    const dbref = ref(db)

    get(child(dbref, "Categories/"))
        .then((snapshot) => {
            for (const [key, value] of Object.entries(snapshot.val())) {
                // console.log(value.CategoryName)   
                let dropdowncategory = document.getElementById('dropdowncategory')
                let categoryname = document.createElement('li')
                let categoryaction = document.createElement('a')
                categoryaction.textContent = value.CategoryName
                categoryaction.classList.add('dropdown-item')
                categoryname.appendChild(categoryaction)
                dropdowncategory.appendChild(categoryname)
                
                categoryaction.addEventListener('click', ()=> {
                    console.log(value.CategoryName)
                    return value.CategoryName
                })
            }
        })
        

        .catch((error) => {
            alert(error)
        })
}
get_product_categories()



function InsertData(evt) {
    console.log(insine)
    if (enterID.value == "" || enterName.value == "" || enterQuantity.value == "") {
        alert('neuzpildyti visi laukai')
        return
    }

    evt.preventDefault()
    console.log(enterID.value, enterName.value, enterQuantity.value)
    
    set(ref(db, "Products/" + enterID.value), {
        Name: enterName.value,
        ID: enterID.value,
        Quantity: enterQuantity.value,
        Price: enterPrice.value,
        Description: enterDescription.value,
        Photo: enterPhoto.value,
        User: getuseruid(),
        // Category: get_product_categories()
    })
    .then(() => {
        alert('Data Added!')
        fill_one_user_products(true)
    })
    .catch((error) => {
        alert(error)
    })
}

insertBtn.addEventListener('click', InsertData)


function FindData(evt) {
    if (findID.value == "") {
        alert('neuzpildyti visi laukai')
        return
    }

    if (findID.value.length < 3) {
        alert("prekes koda min 3 simboliai")
        return
    }

    evt.preventDefault()

    console.log(`select function ${findID.value}`)

    const dbref = ref(db)

    get(child(dbref, "Products/" + findID.value))
        .then((snapshot) => {
            console.log(snapshot.val().Name)

            if (snapshot.exists()) {
                display_one_product(snapshot.val(), findData)                
            }

            else {
                alert("No data found")
            }
        })

        .catch((error) => {
            alert(error)
        })
}

findBtn.addEventListener('click', FindData)


function UpdateData(evt) {
    evt.preventDefault()

    if (enterID.value == "") {
        alert('neuzpildyti visi laukai')
        return
    }
    // console.log(`update function ${enterID.value} ${enterName.value} ${enterQuantity.value}`)


    const dbref = ref(db)

    get(child(dbref, "Products/"))
        .then((snapshot) => {
            for (const [key, value] of Object.entries(snapshot.val())) {
                if(enterID.value == value.ID && value.User == getuseruid()) {
                    update(ref(db, "Products/" + enterID.value), {
                        Name: enterName.value,
                        Quantity: enterQuantity.value,
                        Price: enterPrice.value,
                        Description: enterDescription.value,
                        Photo: enterPhoto.value
                    })
                
                    .then(() => {
                        alert('Data Updated')
                        fillalldata()
                        return
                    })
                    .catch((error) => {
                        alert(error)
                    })
                }
                
            }
        })
        

        .catch((error) => {
            alert(error)
        })
    
}

updateBtn.addEventListener('click', UpdateData)


function RemoveProduct(productid) {
    remove(ref(db, "Products/" + productid))
        .then(() => {
            alert("Data deleted")
        })
        .catch((error) => {
            console.log(error)
        })
}

removeBtn.addEventListener('click', RemoveProduct)

function fill_one_user_products() {
    const dbref = ref(db)

    get(child(dbref, "Products/"))
        .then((snapshot) => {
            findData.innerHTML = ""
            for (const [key, value] of Object.entries(snapshot.val())) {
                if (value.User == getuseruid()) {
                    display_user_product(value, findData)
                }
            }

        })

        .catch((error) => {
            console.log('No products')
        })
        
}

function loadproduct(product, appendproduct, favourite_button = false) {
    let listItem = document.createElement('li')
    listItem.classList.add("list=group-item", "list-group-item-secondary")
    listItem.innerHTML = "Product Name: " + product.Name


    if (favourite_button) {
        let favourite_product_button = document.createElement('button')
        favourite_product_button.textContent = 'Favourite'
        favourite_product_button.classList.add('btn', 'btn-primary')
        favourite_product_button.id = 'favourite_' + product.ID
        listItem.appendChild(favourite_product_button)

        favourite_product_button.addEventListener('click', ()=> {

            let favourite_ads = document.getElementById("favourite_ads")
            let h1 = document.createElement('h1')
            h1.textContent = 'LOOL'
            favourite_ads.appendChild(h1)
    
            set(ref(db, "Favourite_products/" + product.ID), {
                product: product.ID,
                
            })
            .then(() => {
                alert('Data Added!')
            })
            .catch((error) => {
                alert(error)
            })
        })
    }

    appendproduct.appendChild(listItem)

    let listItemSecond = document.createElement('li')
    listItemSecond.classList.add("list-group-item", "list-group-item-light")
    listItemSecond.textContent = "Product Quantity: " + product.Quantity
    appendproduct.appendChild(listItemSecond)

    let listItemThird = document.createElement('li')
    listItemThird.classList.add("list-group-item", "list-group-item-light")
    listItemThird.textContent = "Product Price: " + product.Price
    appendproduct.appendChild(listItemThird)

    let listItemFoured = document.createElement('li')
    listItemFoured.classList.add("list-group-item", "list-group-item-light")
    listItemFoured.textContent = "Product Despriction: " + product.Description
    appendproduct.appendChild(listItemFoured)

    let listItemFived = document.createElement('li')
    let my_img = document.createElement('img')
    my_img.classList.add('container-fluid')
    my_img.src = product.Photo
    listItemFived.classList.add("list-group-item", "list-group-item-light")
    listItemFived.textContent = "Photo: "
    appendproduct.appendChild(listItemFived)
    appendproduct.appendChild(my_img)




    // document.getElementById(commentsId).addEventListener('click', ()=> {
    //     var myModal = new bootstrap.Modal(document.getElementById('commentsModal'))
    //     // let commentsContent = document.getElementById('commentsBody')
    //     //get All comments by product ID
        
    //     // commentsContent.textContent = commentsId;
    //     myModal.show()

    //     document.getElementById('sumbitcomment').addEventListener('click', ()=> {
    //         let entercomment = document.getElementById('entercomment')
    //         let commentcontent = document.getElementById('commentcontent')
        
    //         let li = document.createElement('li')
    //         li.classList.add('list-group-item')
    //         li.textContent = entercomment.value
    //         commentcontent.appendChild(li)

    //         set(ref(db, "Product_comments/" + product.ID + entercomment.value), {
    //             Comments: entercomment.value
                
    //         })
    //         .then(() => {
    //             alert('Data Added!')
    //         })
    //         .catch((error) => {
    //             alert(error)
    //         })
            
    //     })


    // })
}


function show_favourite_products() {
    let append_favourite_ad = document.getElementById('favourite_ads')
    append_favourite_ad.textContent = ''

    const dbref = ref(db)

    get(child(dbref, "Favourite_products/"))
        .then((snapshot) => {
            for (const [key, value] of Object.entries(snapshot.val())) {
                // console.log(value.product)
                get(child(dbref, "Products/" + value.product))
                    .then((snapshot) => {
                        loadproduct(snapshot.val(), append_favourite_ad)
                        // console.log(snapshot.val())
                    })

                    .catch((error) => {
                        console.log('No products')
                    })

            }
        })

        .catch((error) => {
            alert(error)
        })
}





function display_one_product(product, appendproduct) {
    appendproduct.innerHTML = ""
    loadproduct(product, appendproduct)
}

function display_delete_button(product, appendproduct) {

        const remove_product_button = document.createElement('button')
        remove_product_button.textContent = 'Delete AD'
        remove_product_button.id = 'delete' + product.ID
        remove_product_button.classList.add('btn', 'btn-danger', 'mb-5')
        appendproduct.appendChild(remove_product_button)

        return remove_product_button
        
}

function display_admin_product(product, appendproduct) {
    loadproduct(product, appendproduct)
    const delete_button = display_delete_button(product, appendproduct)
    delete_button.addEventListener('click', ()=> {
        RemoveProduct(product.ID)
        fill_admin_product()
    })
}

function display_user_product(product, appendproduct) {
    loadproduct(product, appendproduct)
    const delete_button = display_delete_button(product, appendproduct)
    delete_button.addEventListener('click', ()=> {
        RemoveProduct(product.ID)
        fill_one_user_products()
    })
}


// function display_comment_button(product, appendproduct) {
//     const commentButton = document.createElement('button')
//     commentButton.textContent = 'Comment'
//     remove_product_button.id = 'comment' + product.ID
//     remove_product_button.classList.add('btn', 'btn-primary')
//     appendproduct.appendChild(commentButton)

// }


document.getElementById('clear').addEventListener('click', ()=> {
    findData.value = ''
    fillalldata()
})


export { fill_one_user_products, display_admin_product, display_user_product, loadproduct, show_favourite_products }