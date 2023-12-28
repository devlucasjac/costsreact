import styles from "./ProjectForm.module.css";

import Input from "../form/input";
import Select from "../form/select";
import SubmitButton from "../form/submitButton";

function ProjectForm({ btnText }) {
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
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
