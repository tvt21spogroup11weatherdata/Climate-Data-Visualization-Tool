import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function Navigation(props){
    var userElement = []

    const [loggedIn, setLoggedIn] = useState(false);

    function signOut(){
        console.log("sign out")
    }

    if(loggedIn){
        userElement.push(<Nav.Link key="0" href="/newcollection">New Collection</Nav.Link>)
        userElement.push(<Nav.Link key="1"  href="/account">Account</Nav.Link>)
        userElement.push(<Nav.Link key="2"  onClick= {() => signOut()}>Sign out</Nav.Link>)
    }
    else {
        userElement.push(<Nav.Link key="3"  href="/login">Login</Nav.Link>)
        userElement.push(<Nav.Link key="4"  href="/signup">Sign up</Nav.Link>)
    }

    return (
        <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home Page</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse key="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/temp" key="5" >Temperature/CO<sub>2</sub> Visualizations</Nav.Link>
            <Nav.Link href="/emission" key="6" >Emission Visualization</Nav.Link>
            <Nav.Link key="7" ><button onClick= {() => setLoggedIn(!loggedIn)}>Switch login navs</button></Nav.Link>
            {userElement}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}