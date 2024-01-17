import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Conteiner from "../layout/Conteiner";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://127.0.0.1:8000/api/v1/projetos/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 300);
  }, [id]);

  function editPost(project) {
    fetch(`http://127.0.0.1:8000/api/v1/projetos/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        setMessage("Projeto atualizado!");
        setType("success");
      })
      .catch((err) => {
        console.log(err);
        setType("error");
        setMessage(err);
      });
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project ? (
        <div className={styles.project_details}>
          <Conteiner customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.nome}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria :</span> {project.categoria.nome}
                  </p>
                  <p>
                    <span>Orçamento : </span>
                    R$ {project.orçamento}
                  </p>
                  <p>
                    <span>Total utilizado :</span> R$ {project.custo}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    projectData={project}
                    btnText="Concluir edição"
                  />
                </div>
              )}
            </div>
          </Conteiner>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
