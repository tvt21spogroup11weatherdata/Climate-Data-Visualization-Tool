import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"
import { Navbar, Container, Nav } from "react-bootstrap";

//Navigation for visualizations 8 & 9
export default function VisualizeEmissionData(){
    return (
        <Navbar bg="primary" className="tempNav" expand="lg">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse key="basic-navbar-nav">
            <Nav fill variant="pills" className="me-auto">
                <Nav.Link href="/V8" key="0" aria-live="polite">
                    <button className="btn btn-primary">Global CO2 emissions by country</button>
                </Nav.Link>
                <Nav.Link href="/V9" key="1" aria-live="polite">
                    <button className="btn btn-primary">Global CO2 emissions by sectors</button>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
    return (
        <><p>
        <a className="btn btn-primary" href="/V8">Global CO2 emissions by country</a>&nbsp;
        <a className="btn btn-primary" href="/V9">Global CO2 emissions by sectors</a></p>
        </>
    )
         
 }