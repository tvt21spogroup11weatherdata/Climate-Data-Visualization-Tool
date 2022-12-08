import { useState } from "react"
import axios from "axios"
import { setAuthToken } from "./SetAuthToken"

export default function LoginForm ({setUser}){
    const [loggedIn, setLoggedIn] = useState("") //for jest ??
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage]= useState(null)

    function logIn(){
        const loginPayLoad = {
            "username": userName,
            "pwd": password
        }

        axios.post("http://localhost:3001/login", loginPayLoad)
        .then(response => {
            setErrorMessage(false)
            setAuthToken(response.data.token)
            window.localStorage.setItem("username", userName)
            window.localStorage.setItem("userID", response.data.id)
            window.localStorage.setItem("token", response.data.accessToken);
            window.location.href = '/account'
            setUser(userName)
        }).catch(error => {
            console.log(error)
            setErrorMessage(error.response.statusText)
        })
    }

    function errorElement(){
        if(errorMessage !== null && errorMessage) {
            return(
                <p>Wrong username or password</p>
            )
        }
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
                {errorElement()}
            </form>
            <input data-testid="loggedin" defaultValue={loggedIn} hidden/>
        </div>
    )
}