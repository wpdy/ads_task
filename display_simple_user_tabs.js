import { show_favourite_products } from "./product_managment.js"
import { showallads } from "./show_all_ads.js"
import { signout } from "./sign_out_button.js"

let tabSignOut = document.getElementById('tabSignOut')

function display_simple_user_tabs() {
    signout(tabSignOut)
    showadsbutton()
    showcreateadbutton()
    show_favourite_ads()
}

function showadsbutton() {
    document.getElementById('addadvert').addEventListener('click', ()=> {
        document.getElementById('content').style.display = 'none'
        document.getElementById('adverts_content').style.display = 'block'
        document.getElementById('favourite_ads').style.display = 'none'
        showallads()
        // show_product_comments()
    })
}

function showcreateadbutton() {
    document.getElementById('createadvert').addEventListener('click', ()=> {
        document.getElementById('content').style.display = 'block'
        document.getElementById('adverts_content').style.display = 'none'
        document.getElementById('favourite_ads').style.display = 'none'

    })

}

function show_favourite_ads() {
    document.getElementById('show_favourite_ads').addEventListener('click', ()=> {
        document.getElementById('favourite_ads').style.display = 'block'
        document.getElementById('content').style.display = 'none'
        document.getElementById('adverts_content').style.display = 'none'
        show_favourite_products()
    })
}

export { display_simple_user_tabs }
