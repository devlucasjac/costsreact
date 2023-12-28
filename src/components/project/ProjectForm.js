import styles from "./ProjectForm.module.css";

import Input from "../form/input";
import Select from "../form/select";

function ProjectForm() {
  function Conta(e) {
    e.preventDefault();
    console.log("2");
    return 2;
  }

  const ops = ["ola", "ted", "tef", "selic"];

  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto:"
        placeholder="insira o nome do projeto"
        name="name"
      />
      <Input
        type="number"
        text="Orçamento do projeto:"
        name="budget"
        placeholder="Insira o orçamento total"
      />
      <Select name="category_id" text="Selecione a categoria:" options={ops} />
      <div>
        <input type="submit" value="criar projeto" onClick={Conta} />
      </div>
    </form>
  );
}

export default ProjectForm;
