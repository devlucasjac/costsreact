import { Link } from "react-router-dom";

import Conteiner from "./Conteiner";

import styles from "./NavBar.module.css";
import logo from "../../img/costs_logo.jpeg";

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Conteiner>
        <ul>
          <li>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contato</Link>
          </li>
          <li>
            <Link to="/company">Empresa</Link>
          </li>
          <li>
            <Link to="/newproject">Novo Projeto</Link>
          </li>
        </ul>
      </Conteiner>
    </nav>
  );
}

export default NavBar;
