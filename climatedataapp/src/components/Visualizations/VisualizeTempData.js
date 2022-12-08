import { Navbar, Container, Nav } from "react-bootstrap";

/* Navigation for visualizations 1-7 + 10 */
export default function VisualizeTempData(){
    return (
        <Navbar bg="primary" className="tempNav" expand="lg">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse key="basic-navbar-nav">
            <Nav fill variant="pills" className="me-auto">
                <Nav.Link href="/V1" key="0" aria-live="polite">
                    <button className="btn btn-primary">Global historical surface temperature anomalies from January 1850 onwards</button>
                </Nav.Link>
                <Nav.Link href="/V4" key="1" aria-live="polite">
                    <button className="btn btn-primary">Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements</button>
                </Nav.Link>
                <Nav.Link href="/V5" key="2" aria-live="polite">
                    <button className="btn btn-primary">Vostok Ice Core CO2 measurements, 417160 - 2342 years</button>
                </Nav.Link>
                <Nav.Link href="/V6" key="3" aria-live="polite">
                    <button className="btn btn-primary">Ice core 800k year composite study CO2 measurements</button>
                </Nav.Link>
                <Nav.Link href="/V7" key="4" aria-live="polite">
                    <button className="btn btn-primary">Evolution of global temperature over the past two million years</button>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}