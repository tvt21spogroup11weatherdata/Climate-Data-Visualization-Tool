export default function LoginForm(){
    function logIn(){
        console.log("axios log in endpoint, store to localStorage")
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={logIn()}>
                <p><input type="text" placeholder="Username" required></input></p>
                <p><input type="password" placeholder="Password" required></input></p>
                <p><input type="submit" value="Login"/></p>
            </form>
        </div>
    )
}