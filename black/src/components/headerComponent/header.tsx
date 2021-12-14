/* eslint-disable react/function-component-definition */
import HeaderProps from "@/types/interfaces/props/headerProps/headerProps";
import styles from "./header.module.scss";
import Navigation from "./navComponent/nav";

const Header: React.FC<HeaderProps> = (props): JSX.Element => (
  <header className={styles.header}>
    <Navigation signOut={props.signOutHandle} />
  </header>
);

export default Header;
