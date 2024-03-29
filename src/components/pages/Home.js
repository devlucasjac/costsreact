import styles from "./Home.module.css";
import savings from "../../img/savings.jpeg";

import LinkButton from "../layout/LinkButton";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem Vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar seus projetos agora mesmo!</p>
      <LinkButton to="/newProject" text="Criar Projeto"></LinkButton>
      <img src={savings} alt="sua mãe" />
    </section>
  );
}

export default Home;
