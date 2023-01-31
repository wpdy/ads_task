

import { load_simple_user_page } from "./user_roles/load_simple_user_page.js";
import { load_admin_page } from "./user_roles/load_admin_page.js";
import { getuserrole } from "./user_managment.js";
import { signout } from "./SignOut_button.js";

const simple_user_SignOutButtonPlace = document.getElementById('contentSignOutButton')
const admin_user_SignOutButtonPlace = document.getElementById('signoutButton')

function useron() {
    getuserrole().then(data => {
        if (data == 'admin') {
            signout(admin_user_SignOutButtonPlace)
            load_admin_page()
        }
        else if (data == 'simple_user') {
            signout(simple_user_SignOutButtonPlace)
            load_simple_user_page()
        }
        else {
            location.reload();
        }
    })
}


export { useron }