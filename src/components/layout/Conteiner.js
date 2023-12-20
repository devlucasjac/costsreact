import styles from "./Conteiner.module.css";

function Conteiner(props) {
  return (
    <div
      className={
        /*Desta maneira é possível passar uma classe de estilização por props, obs:esta classe ja deve estar em styles*/ `${
          styles.conteiner
        } ${styles[props.customClass]}`
      }
    >
      {props.children}
    </div>
  );
}

export default Conteiner;
