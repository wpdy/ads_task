import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";



const auth = getAuth()

function signout(appendSignOutButton) {
    
    const SignOutButton = document.createElement('button')
    SignOutButton.textContent = 'Sign Out'
    SignOutButton.id = 'signOut'
    SignOutButton.className = 'btn btn-dark'
    appendSignOutButton.appendChild(SignOutButton)
    
    SignOutButton.addEventListener('click', ()=> {
        signOut(auth).then(() => {
            console.log('Sign-out successful!')
            SignOutButton.remove()
        })
    
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorMessage)
        })
    })

}

export { signout }