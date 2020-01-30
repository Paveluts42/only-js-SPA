export function getAuthForm() {
    // document.getElementById('authForm', () => console.log('hhh')).preventDefault()
    return `   <form class="mui-form" id="authForm">
                <div class="mui-textfield mui-textfield--float-labelm ">
                    <input type="email" id="email" required >
                    <label for="email">email</label>
                </div>       
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="password" required >
                    <label for="password">password</label>
                </div>
                <button type="submit" id="authButton"  class="mui-btn mui-btn--raised mui-btn--primary"

                >Submit</button>
            </form>
`
}

export function authWithEmailAndPassword(email,password) {
    const apiKey="AIzaSyAOOdXSPATyVEtmAQc0a5jT_fgByP3ko-Q"
return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
    method:"POST",
    body:JSON.stringify({
        email,password,
        returnSecureToken:true
    }),headers:{
        "Content-Type":"application/json"
    }
}).then(response=>response.json()
).then(data=>data.idToken)

}
