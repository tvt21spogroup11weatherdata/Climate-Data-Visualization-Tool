export default function SignupForm(){
    return(
        <div>
            <h1>Sign up</h1>
            <form>
                <p><input type="text" placeholder="Username" required></input></p>
                <p><input type="text" placeholder="Password" required></input></p>
                <p><input type="submit" value="Sign up"/></p>
            </form>
        </div>
    )
}