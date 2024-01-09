import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState();

  useEffect(() => {
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
  }, [id]);

  return (
    <>
      {project && (
        <>
          <div>{project.nome}</div>
          <p>{project.orçamento}</p>
        </>
      )}
    </>
  );
}

export default Project;
