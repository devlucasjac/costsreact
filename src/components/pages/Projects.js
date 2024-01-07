import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Message from "../layout/Message";
import Conteiner from "../layout/Conteiner";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

import styles from "./Projects.module.css";

function Projects() {
  const [projetos, setProjetos] = useState([]);

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/projetos/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setProjetos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message msg={message} type="success" />}
      <Conteiner customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto) => (
            <ProjectCard
              id={projeto.id}
              name={projeto.nome}
              budget={projeto.orçamento}
              category={projeto.categoria}
              key={projeto.id}
            />
          ))}
      </Conteiner>
    </div>
  );
}

export default Projects;
