import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Conteiner from "../layout/Conteiner";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../services/ServiceForm";

function Project() {
  const { id } = useParams();
  const headers = {
    "Content-Type": "application/json",
  };

  const [project, setProject] = useState();
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://127.0.0.1:8000/api/v1/projetos/${id}/`, {
        method: "GET",
        headers: headers,
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
    setMessage("");
    fetch(`http://127.0.0.1:8000/api/v1/projetos/${id}/`, {
      method: "PUT",
      headers: headers,
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

  function createService(service) {
    setMessage("");
    fetch("http://127.0.0.1:8000/api/v1/servi%C3%A7o/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(service),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (
          data ===
          "O custo total dos serviços não deve exceder o orçamento do projeto"
        ) {
          console.log("entrou");
          setMessage(data);
          setType("error");
          return;
        }
        setMessage("Serviço Criado!");
        setType("success");
      })
      .catch((e) => {
        setMessage(e);
        setType("error");
      });
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceFrom() {
    setShowServiceForm(!showServiceForm);
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
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button onClick={toggleServiceFrom} className={styles.btn}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Conteiner customClass="start">
              <p>serviços</p>
            </Conteiner>
          </Conteiner>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
