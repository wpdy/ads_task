

import { load_simple_user_page } from "./user_roles/load_simple_user_page.js";
import { load_admin_page } from "./user_roles/load_admin_page.js";
import { tabai } from "./tabs.js";
import { getuserrole } from "./user_managment.js";
import { signout } from "./SignOut_button.js";

const SignOutButtonPlace = document.getElementById('contentSignOutButton')

function useron() {
    getuserrole().then(data => {
        if (data == 'simple_user') {
            signout(SignOutButtonPlace)
            load_simple_user_page()
            tabai()
        }
        else {
            load_admin_page()
            console.log('Neveikia')
        }
    })
}


export { useron }