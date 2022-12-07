import { useState } from "react"
import axios from "axios"

export default function SignupForm (){
    const [signedUp, setSignedUp] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage]= useState(null)

    function signUp(){
        //REQRES TEST
        const signupPayload = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }

        const invalidSignupPayload = {
            "email": "sydney@fife"
        }

        //REQRES TEST
        axios.post("https://reqres.in/api/register", signupPayload)
        .then(response => {
            setErrorMessage(false)
            window.localStorage.setItem("token", response.data.token);
            window.location.href = '/account'
        }).catch(error => {
            if(error.response.status === 400) setErrorMessage("Username already exists")
            console.log(error)
        })
    }

    function errorElement(){
        if(errorMessage !== null && errorMessage) {
            return(
                <p>{errorMessage}</p>
            )
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        signUp()
    }

    return(
        <div>
            <h1>Sign up</h1>
            <form id="loginForm" onSubmit={(e) => handleSubmit(e)}>
                <p><input data-testid="Username" type="text"     onChange={e => setUserName(e.target.value)} placeholder="Username"></input><input data-testid="TestUserName" defaultValue={userName} hidden/></p>
                <p><input data-testid="Password" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"></input><input data-testid="TestPassword" defaultValue={userName} hidden/></p>
                <p><input data-testid="submit" type="submit" value="Sign up"/></p>
                {errorElement()}
            </form>
            <input data-testid="signedup" defaultValue={signedUp} hidden/>
        </div>
    )
}