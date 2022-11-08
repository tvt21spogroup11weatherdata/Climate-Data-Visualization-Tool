export default function Navbar(){
    var loggedIn = true;

    var userElement;

    if(loggedIn){
        userElement = (<ul className="navbar-nav ms-auto">
        <li className="nav-item">
            <a className="nav-link" href="/account">Account</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Sign out</a> {/* NOTHING HAPPENING YET */}
        </li>
    </ul>)
    }
    else {
        userElement = (<ul className="navbar-nav ms-auto">
        <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/signup">Sign up</a>
        </li>
    </ul>)
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div data-bs-toggle="collapse" class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

                <li className="nav-item">
                    <a className="nav-link" href="/temp">Temperature Visualization</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/emission">Emission Visualization</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/adjsaskfjak">User Defined test page</a>
                </li>
            </ul>
            {userElement}
        </div>
        </nav>
        <div id="buffer"></div>
        </>
    )
}