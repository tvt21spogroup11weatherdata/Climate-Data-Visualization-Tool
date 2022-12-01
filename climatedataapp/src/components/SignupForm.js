export default function SignupForm(){
    function signUp(){
        console.log("axios sign in endpoint")
    }

    return(
        <div>
            <h1>Sign up</h1>
            <form onSubmit={signUp()}>
                <p><input type="text" placeholder="Username" required></input></p>
                <p><input type="password" placeholder="Password" required></input></p>
                <p><input type="submit" value="Sign up"/></p>
            </form>
        </div>
    )
}