import { useNavigate } from "react-router-dom";

import styles from "./NewProject.module.css";

import ProjectForm from "../project/ProjectForm";

function NewProject() {
  //é utilizado para se redirecionar o usuario a uma pagina desejada
  const navigate = useNavigate();

  const state = { message: "Projeto criado com sucesso!" };

  function createPost(project) {
    //initialize cost and services
    fetch("http://127.0.0.1:8000/api/v1/projetos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json)
      .then((data) => {
        console.log(data);
        navigate("/projects", { state });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm
        handleSubmit={createPost}
        btnText="Criar Projeto!"
      ></ProjectForm>
    </div>
  );
}

export default NewProject;
