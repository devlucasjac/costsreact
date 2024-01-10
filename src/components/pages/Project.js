import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Conteiner from "../layout/Conteiner";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState();
  const [showProjectForm, setShowProjectForm] = useState(false);

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
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project ? (
        <div className={styles.project_details}>
          <Conteiner customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.nome}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria :</span> {project.categoria}
                  </p>
                  <p>
                    <span>Orçamento : </span>
                    {project.orçamento}
                  </p>
                  <p>
                    <span>Total utilizado :</span> project.custo
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>formulario</p>
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
