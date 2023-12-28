import styles from "./ProjectForm.module.css";

import Input from "../form/input";

function ProjectForm() {
  function Conta(e) {
    e.preventDefault();
    console.log("2");
    return 2;
  }
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
      <div>
        <select name="category_id">
          <option disabled>Selecione a categoria</option>
        </select>
      </div>
      <div>
        <input type="submit" value="criar projeto" onClick={Conta} />
      </div>
    </form>
  );
}

export default ProjectForm;
