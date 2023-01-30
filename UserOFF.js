



function useroff() {
    document.getElementById('admin_content').style.display = 'none'

    document.getElementById('content').style.display = 'none'
    document.getElementById('forms').style.display = 'block';

    document.getElementById('loginForm').style.display = 'block'
    document.getElementById('registerForm').style.display = 'none'


    document.getElementById('adverts_content').style.display = 'none'
    document.getElementById('nav-tab').style.display = 'none'


    document.getElementById('register').addEventListener('click', ()=> {
        document.getElementById('loginForm').style.display = 'none'
        document.getElementById('registerForm').style.display = 'block'
    })

    document.getElementById('login').addEventListener('click', ()=> {
        document.getElementById('loginForm').style.display = 'block'
        document.getElementById('registerForm').style.display = 'none'
    })
}

export { useroff }