/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useSelector } from "react-redux";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import StateType from "@/redux/types/stateType";
import styles from "./nav.module.scss";
import { companyName } from "@/types/constants/globals/theme";

function Navigation(props): JSX.Element {
  const appState = useSelector<StateType, StateType>((state) => state);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" className={styles.navBar} variant="dark">
      <Container>
        <Navbar.Brand href="#home">{companyName.toUpperCase()}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={styles.navItem} href="/computers">
              Features
            </Nav.Link>

            <Nav.Link className={styles.navItem} href="#pricing">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            {appState.user.authencated ? (
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                {appState.role === "admin" ? <NavDropdown.Item disabled>Welcome back admin</NavDropdown.Item> : null}
                <NavDropdown.Item href="#action/3.1">{appState.user.userName}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Sign out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link className={styles.navItem} href="/sign-in">
                Sign in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    /* {
    <nav className={styles.navBar}>
      <ol>
        <li>
          <NavLink activeClassName={styles.active} to={props.data.home.route}>
            {props.data.home.label}
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName={styles.active} to={props.data.computers.route}>
            {props.data.computers.label}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to={props.data.about.route}>
            {props.data.about.label}
          </NavLink>
        </li>
        {!appState.user.authencated ? (
          <li>
            <NavLink activeClassName={styles.active} to={props.data.signIn.route}>
              {props.data.signIn.label}
            </NavLink>
          </li>
        ) : null}

        {!appState.user.authencated ? (
          <li>
            <NavLink activeClassName={styles.active} to={props.data.signUp.route}>
              {props.data.signUp.label}
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <HeaderCartItem styles={styles} data={props} />
            </li>
            <li>
              <button type="button" onClick={props.signOutHandle}>
                <span>Sign out</span>
              </button>
            </li>
          </>
        )}
      </ol>
    </nav> */
  );
}
export default Navigation;
