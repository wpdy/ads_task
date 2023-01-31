import { display_product_categories, fill_one_user_products } from "../product_managment.js";
import { display_simple_user_tabs } from "../display_simple_user_tabs.js";

function load_simple_user_page() {
    document.getElementById('forms').style.display = 'none';
    document.getElementById('content').style.display = 'block'
    document.getElementById('admin_content').style.display = 'none'

    document.getElementById('simple_user_tabs').style.display = 'flex'
    display_simple_user_tabs()
    display_product_categories()
    fill_one_user_products()
}

export {load_simple_user_page}