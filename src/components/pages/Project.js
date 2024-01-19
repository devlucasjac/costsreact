import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Conteiner from "../layout/Conteiner";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard";

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
      fetch(
        `https://costs-django-672bb4a4fc64.herokuapp.com/api/v1/projetos/${id}/`,
        {
          method: "GET",
          headers: headers,
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 300);
  }, [id, message]);

  useEffect(() => {
    fetch(
      `https://costs-django-672bb4a4fc64.herokuapp.com/api/v1/projetos/${id}/serviços/`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data);
      })
      .catch((err) => console.log(err));
  }, [id, message]);

  function editPost(project) {
    setMessage("");
    fetch(
      `https://costs-django-672bb4a4fc64.herokuapp.com/api/v1/projetos/${id}/`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(project),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        setMessage("Projeto atualizado!");
        setType("success");
      })
      .catch((err) => {
        setType("error");
        setMessage(err);
      });
  }

  function createService(service) {
    setMessage("");
    fetch("https://costs-django-672bb4a4fc64.herokuapp.com/api/v1/serviço/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(service),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (
          data ===
          "O custo total dos serviços não deve exceder o orçamento do projeto"
        ) {
          setMessage(data);
          setType("error");
          return;
        } else {
          setMessage("Serviço Criado!");
          setType("success");
          setShowServiceForm(false);
        }
      })
      .catch((e) => {
        setMessage(e);
        setType("error");
      });
  }

  function removeService(id) {
    setMessage("");
    fetch(
      `https://costs-django-672bb4a4fc64.herokuapp.com/api/v1/serviço/${id}`,
      {
        method: "DELETE",
        headers: headers,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("enviou");
        setMessage("Serviço Deletado!");
        setType("success");
      })
      .catch((e) => {
        console.log(e);
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
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.nome}
                    description={service.descrição}
                    cost={service.custo}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não ha serviços cadastrados</p>}
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
