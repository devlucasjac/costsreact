import { useState, useEffect } from "react";

import styles from "./ProjectForm.module.css";

import Input from "../form/input";
import Select from "../form/select";
import SubmitButton from "../form/submitButton";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/categoria/", {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      categoria: e.target.options[e.target.selectedIndex].id,
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto:"
        placeholder="insira o nome do projeto"
        name="nome"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Orçamento do projeto:"
        name="orçamento"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
      />
      <Select
        name="categoria"
        text="Selecione a categoria:"
        options={categories}
        handleOnChange={handleCategory}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}
// insira em Select quando quiser: value={project.categoria ? project.categoria : ""}
export default ProjectForm;
