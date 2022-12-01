import { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
export default function Navigation(props){
    var userElement = []

    const [loggedIn, setLoggedIn] = useState(false);

    function signOut(){
        console.log("sign out")
    }

    //////////////////////////////////////////
    ///for testing switching views
    var loginTestElement = (<ul className="navbar-nav ms-auto"><li><button style={{height: "10px"}} onClick= {() => setLoggedIn(!loggedIn)}>Switch login navs</button></li></ul>);
    //////////////////////////////////////////
    if(loggedIn){
        userElement.push(<Nav.Link href="/newcollection">New Collection</Nav.Link>)
        userElement.push(<Nav.Link href="/account">Account</Nav.Link>)
        userElement.push(<Nav.Link onClick= {() => signOut()}>Sign out</Nav.Link>)
    }
    else {
        userElement.push(<Nav.Link href="/login">Login</Nav.Link>)
        userElement.push(<Nav.Link href="/signup">Sign up</Nav.Link>)
    }

    return (
        <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/temp">Temperature/CO<sub>2</sub> Visualizations</Nav.Link>
            <Nav.Link href="/emission">Emission Visualization</Nav.Link>
            <Nav.Link><button onClick= {() => setLoggedIn(!loggedIn)}>Switch login navs</button></Nav.Link>
            {userElement}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}