import styles from "./Home.module.css";
import savings from "../../img/savings.jpeg";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem Vindo ao Costs</h1>
      <p>Comece a gerenciar seus projetos agora mesmo!</p>
      <a href="/">Criar projeto</a>
      <img src={savings} alt="sua mãe" />
    </section>
  );
}

export default Home;
