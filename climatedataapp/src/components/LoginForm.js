import { useState } from "react"

export default function LoginForm (){
    const [loggedIn, setLoggedIn] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    function logIn(){
        //console.log("axios login endpoint, store token to localStorage")
        //AXIOS LOGIN
        setLoggedIn("logged in")
    }

    function handleSubmit(e){
        e.preventDefault()
        logIn()
    }

    return(
        <div>
            <h1>Log in</h1>
            <form id="loginForm" onSubmit={(e) => handleSubmit(e)}>
                <p><input data-testid="Username" type="text"     onChange={e => setUserName(e.target.value)} placeholder="Username"></input><input data-testid="TestUserName" defaultValue={userName} hidden/></p>
                <p><input data-testid="Password" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"></input><input data-testid="TestPassword" defaultValue={password} hidden/></p>
                <p><input data-testid="submit" type="submit" value="Log in"/></p>
            </form>
            <input data-testid="loggedin" defaultValue={loggedIn} hidden/>
        </div>
    )
}