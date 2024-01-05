import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Message from "../layout/Message";

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
      .then((data) => setProjetos(data))
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <h1>Meus Projetos</h1>
      {message && <Message msg={message} type="success" />}
    </div>
  );
}

export default Projects;
