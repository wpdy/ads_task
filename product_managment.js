

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { firebaseConfig } from "./firebase.js";


import { getuseruid } from "./user_managment.js";
import { fill_admin_product } from "./user_roles/load_admin_page.js";

const app = initializeApp(firebaseConfig);
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
let findBtn = document.getElementById("find")

 
let dropdowncategory = document.getElementById('dropdowncategory')

function display_product_categories() {

    const dbref = ref(db)

    get(child(dbref, "Categories/"))
        .then((snapshot) => {
            for (const [key, value] of Object.entries(snapshot.val())) {
                let categoryname = document.createElement('option')
                categoryname.textContent = value.CategoryName
                dropdowncategory.appendChild(categoryname)
            }
        })

        .catch((error) => {
            console.log('No categories in database')
        })
}



function InsertData(evt) {
    console.log(dropdowncategory.value)
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
        Category: dropdowncategory.value
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
                        Photo: enterPhoto.value,
                        Category: dropdowncategory.value
                    })
                
                    .then(() => {
                        alert('Data Updated')
                        fill_one_user_products()
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
        favourite_product_button.textContent = 'Add to Favourite'
        favourite_product_button.classList.add('btn', 'btn-outline-secondary', 'ms-2')
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

    let listItemSixed = document.createElement('li')
    listItemSixed.classList.add("list-group-item", "list-group-item-light")
    listItemSixed.textContent = "Product Category: " + product.Category
    appendproduct.appendChild(listItemSixed)

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
    
}


function show_favourite_products() {
    let append_favourite_ad = document.getElementById('favourite_ads')
    append_favourite_ad.textContent = ''

    const dbref = ref(db)

    get(child(dbref, "Favourite_products/"))
        .then((snapshot) => {
            for (const [key, value] of Object.entries(snapshot.val())) {
                get(child(dbref, "Products/" + value.product))
                    .then((snapshot) => {
                        loadproduct(snapshot.val(), append_favourite_ad)
                    })

                    .catch((error) => {
                        console.log('No products')
                    })

            }
        })

        .catch((error) => {
            console.log("No favourite ads")

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

document.getElementById('clear').addEventListener('click', ()=> {
    findData.value = ''
    fillalldata()
})


export { fill_one_user_products, display_admin_product, display_user_product, loadproduct, show_favourite_products, display_product_categories }