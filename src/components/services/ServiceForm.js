import styles from "../project/ProjectForm";

import Input from "../form/input";
import SubmitButton from "../form/submitButton";

import { useState } from "react";

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({
    projeto: projectData.id,
  });

  function submit(e) {
    e.preventDefault();
    handleSubmit(service);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type="text"
        text="nome do serviço"
        placeholder="insira o nome do serviço"
        name="nome"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        placeholder="insira o custo do serviço"
        name="custo"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="descrição do serviço"
        placeholder="insira a descrição do serviço"
        name="descrição"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
