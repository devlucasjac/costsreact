import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Message from "../layout/Message";
import Conteiner from "../layout/Conteiner";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

import styles from "./Projects.module.css";

function Projects() {
  const [projetos, setProjetos] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://127.0.0.1:8000/api/v1/projetos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjetos(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  function removeProject(id) {
    fetch(`http://127.0.0.1:8000/api/v1/projetos/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjetos(projetos.filter((projeto) => projeto.id !== id));
        setProjectMessage("Projeto removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={message} type="success" />}
      <Conteiner customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto) => (
            <ProjectCard
              id={projeto.id}
              name={projeto.nome}
              budget={projeto.orçamento}
              category={projeto.categoria.nome}
              key={projeto.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projetos.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Conteiner>
    </div>
  );
}

export default Projects;
