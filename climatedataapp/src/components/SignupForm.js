import { useState } from "react"

export default function SignupForm (){
    const [signedUp, setSignedUp] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    function signUp(){
        //console.log("axios signup endpoint, also login? store token to localStorage")
        //AXIOS LOGIN
        setSignedUp("signed up")
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
            </form>
            <input data-testid="signedup" defaultValue={signedUp} hidden/>
        </div>
    )
}