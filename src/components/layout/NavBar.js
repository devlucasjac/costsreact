import {Link} from "react-router-dom"

import styles from "./NavBar.module.css"
import logo from "../../img/0.png"

import Conteiner from "./Conteiner"

function NavBar(){
    return (
    <nav class={styles.navbar}>
    <Conteiner>
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <ul class={styles.list}>
        <Link to="/">Home</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/company">Company</Link>
        <Link to="/newProject">NewProject</Link>
        </ul>
    </Conteiner>
    </nav>
    )
}

export default NavBar