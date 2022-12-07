import { useState } from "react"
import axios from "axios"

export default function LoginForm (props){
    const [loggedIn, setLoggedIn] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage]= useState(null)

    function logIn(){
        //REQRES TEST
        const loginPayload = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }
        //REQRES TEST
        const falseLogin = {
            email: 'peter@klaven',
            password: ''
        }

        //USE THIS 
        const loginLoad = {
            userName: userName,
            password: password
        }

        //REQRES TEST
        axios.post("https://reqres.in/api/login", loginPayload)
        .then(response => {
            setErrorMessage(false)
            window.localStorage.setItem("token", response.data.token);
            window.location.href = '/account'
        }).catch(error => {
            if(error.response.status === 400) setErrorMessage("Wrong username or password")
            console.log(error)
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