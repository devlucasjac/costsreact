import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./components/pages/Home.js";
import Contact from "./components/pages/Contact.js";
import Company from "./components/pages/Company.js";
import NewProject from "./components/pages/NewProject.js";

import Conteiner from "./components/layout/Conteiner";

function App() {
  return (
    <Router>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/company">Company</Link>
        <Link to="/newProject">NewProject</Link>
      </ul>
      <Conteiner customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/company" element={<Company />} />

          <Route path="/newProject" element={<NewProject />} />
        </Routes>
      </Conteiner>
      <p>footer</p>
    </Router>
  );
}

export default App;
