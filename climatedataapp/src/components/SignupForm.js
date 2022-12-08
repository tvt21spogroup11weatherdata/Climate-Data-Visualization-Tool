import { useState } from "react"
import axios from "axios"

export default function SignupForm (props){
    const [signedUp, setSignedUp] = useState("") //for jest
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage]= useState(null)

    var url = 'http://localhost:3001' // TO ENV !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    function signUp(){
        const signupPayload = {
            "username": userName,
            "pwd": password
        }

        axios.post(url + "/signup", signupPayload)
        .then(response => {
            setErrorMessage(false)
            window.localStorage.setItem("username", userName)
            window.localStorage.setItem("userID", response.data.id)
            window.location.href = '/account'
            setTimeout(alert('Successfully signed up! Please log in'), 500)
        }).catch(error => {
            console.log(error)
            setErrorMessage("Username already exists")
        })
    }

    function errorElement(){
        if(errorMessage !== null && errorMessage) {
            return(<p>{errorMessage}</p>)
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