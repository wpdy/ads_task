import { getDatabase, ref, get, set, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { blockuser } from "../user_managment.js";
import { display_admin_product } from "../product_managment.js";

const db = getDatabase();


function load_admin_page() {
    console.log('ADMIN Settings')

    document.getElementById('admin_content').style.display = 'block'
    document.getElementById('forms').style.display = 'none';    
    document.getElementById('content').style.display = 'none'
    document.getElementById('simple_user_tabs').style.display = 'none'


    fillallusers()
    fill_admin_product()
}


function insertCategory() {
    const categoryName = document.getElementById('categoryName')

    set(ref(db, "Categories/" + categoryName.value), {
        CategoryName: categoryName.value
    })
    .then(() => {
        alert('Data Added!')
        
    })
    .catch((error) => {
        alert(error)
    })
}

document.getElementById('insertCategory').addEventListener('click', ()=> {
    insertCategory()
})


function fillallusers() {
    const dbref = ref(db)

    const admin_users = document.getElementById('admin_users')
    admin_users.textContent = ''

    get(child(dbref, "users/"))
        .then((snapshot) => {
            // console.log(snapshot.val())
            for (const [key, value] of Object.entries(snapshot.val())) {
                const h2 = document.createElement('h2')
                h2.textContent = value.user_email
                var user_button = document.createElement('button')
                user_button.className = 'block btn btn-danger'
                user_button.textContent = 'BLOCK'
                user_button.type = 'button'
                user_button.id = key
                admin_users.appendChild(h2)
                admin_users.appendChild(user_button)
                document.getElementById(key).addEventListener('click', ()=> {
                    blockuser(key)
                })
            }
        })

        .catch((error) => {
            alert(error)
        })
}


function fill_admin_product() {
    let admin_ads = document.getElementById('admin_ads')

    const dbref = ref(db)

    get(child(dbref, "Products/"))
        .then((snapshot) => {
            admin_ads.innerHTML = ""
            for (const [key, value] of Object.entries(snapshot.val())) {
                display_admin_product(value, admin_ads)
            }

        })
        

        .catch((error) => {
            console.log('No products in admin page')
        })
}


export { load_admin_page, fill_admin_product }

