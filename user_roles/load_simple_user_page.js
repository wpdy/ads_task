import { fill_one_user_products, show_favourite_products } from "../product_managment.js";

function load_simple_user_page() {
    document.getElementById('forms').style.display = 'none';
    document.getElementById('content').style.display = 'block'
    document.getElementById('admin_content').style.display = 'none'

    document.getElementById('nav-tab').style.display = 'flex'
    fill_one_user_products()
    // show_favourite_products()
}





export {load_simple_user_page}