import {Link} from "react-router-dom"

import styles from "./NavBar.module.css"
import logo from "../../img/0.png"

import Conteiner from "./Conteiner"

function NavBar(){
    return (
    <nav className={styles.navbar}>
    <Conteiner>
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <ul className={styles.list}>
        <li className={styles.item}><Link to="/">Home</Link></li>
        <li className={styles.item}><Link to="/projects">Projetos</Link></li>
        <li className={styles.item}><Link to="/contact">Contato</Link></li>
        <li className={styles.item}><Link to="/company">Empresa</Link></li>
        <li className={styles.item}><Link to="/newProject">NewProject</Link></li>
        </ul>
    </Conteiner>
    </nav>
    )
}

export default NavBar