/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useSelector } from "react-redux";
import { Container, Nav, Navbar, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import StateType from "@/redux/types/stateType";
import styles from "./nav.module.scss";
import { companyName } from "@/types/constants/globals/theme";
import roles from "@/types/constants/roles/roles";

function Navigation(props): JSX.Element {
  const appState = useSelector<StateType, StateType>((state) => state);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" className={styles.navBar} variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink className={`${styles.navItem} nav-link`} to="/home">
            {companyName.toUpperCase()}
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={`${styles.navItem} nav-link`} to="/computers">
              Features
            </NavLink>

            <NavLink className={`${styles.navItem} nav-link`} to="/about-us">
              About
            </NavLink>
          </Nav>
          <Nav>
            {appState.user.authencated ? (
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                {appState.role === roles.admin ? (
                  <NavDropdown.Item disabled>Welcome back admin</NavDropdown.Item>
                ) : null}
                <NavDropdown.Item href="#action/3.1">{appState.user.userName}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Sign out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink className={`${styles.navItem} nav-link`} to="/sign-in">
                Sign in
              </NavLink>
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
