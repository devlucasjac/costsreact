import { useState, useEffect } from "react";

import styles from "./ProjectForm.module.css";

import Input from "../form/input";
import Select from "../form/select";
import SubmitButton from "../form/submitButton";

function ProjectForm({ btnText }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/categoria/", {
      method: "GET",
      origin: "*",
      headers: {
        "Content-Type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

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
      <Select
        name="category_id"
        text="Selecione a categoria:"
        options={categories}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
