export default function LoginForm(){
    return(
        <div>
            <h1>Login</h1>
            <form>
                <p><input type="text" placeholder="Username" required></input></p>
                <p><input type="password" placeholder="Password" required></input></p>
                <p><input type="submit" value="Login"/></p>
            </form>
        </div>
    )
}