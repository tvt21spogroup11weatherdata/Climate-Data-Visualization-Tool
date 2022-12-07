import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import axios from "axios";
import { logOut } from "./Logout";

export default function Navigation(props){
    var userElement = []

    //this is for jest i think
    const [loggedIn, setLoggedIn] = useState(false);

    function signOut(){
        if(window.confirm("Are you sure you want to log out?")){
            logOut()
            window.location.href = '/'
        }
    }

    if(localStorage.getItem("token") !== null){
        userElement.push(<Nav.Link key="0" href="/newcollection">New Collection</Nav.Link>)
        userElement.push(<Nav.Link key="1"  href="/account">Account</Nav.Link>)
        userElement.push(<Nav.Link key="2"  onClick= {() => signOut()}>Log out</Nav.Link>)
    }
    else {
        userElement.push(<Nav.Link key="3"  href="/login">Login</Nav.Link>)
        userElement.push(<Nav.Link key="4"  href="/signup">Sign up</Nav.Link>)
    }

    return (
        <Navbar bg="" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse key="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" key="8">Home</Nav.Link>
            <Nav.Link href="/temp" key="5" >Temperature/CO<sub>2</sub> Visualizations</Nav.Link>
            <Nav.Link href="/emission" key="6" >Emission Visualization</Nav.Link>
            {userElement}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}