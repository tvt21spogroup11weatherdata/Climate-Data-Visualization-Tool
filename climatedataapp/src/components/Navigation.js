import { useEffect, useState } from "react";

export default function Navbar(props){
    var userElement;
    const [loggedIn, setLoggedIn] = useState(false);

    //////////////////////////////////////////
    ///for testing switching views
    var loginTestElement = (<ul className="navbar-nav ms-auto"><li><button onClick= {() => setLoggedIn(!loggedIn)}>Switch login navs</button></li></ul>);
    //////////////////////////////////////////
    if(loggedIn){
        userElement = (<ul className="navbar-nav ms-auto">
        <li className="nav-item">
            <a className="nav-link" href="/newcollection">New Collection</a>
        </li>
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

        <div data-bs-toggle="collapse" className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/temp">Temperature/CO<sub>2</sub> Visualizations</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/emission">Emission Visualization</a>
                </li>
            </ul>
            {loginTestElement}
            {userElement}
        </div>
        </nav>
        </>
    )
}