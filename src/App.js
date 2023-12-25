import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./components/pages/Home.js";
import Contact from "./components/pages/Contact.js";
import Company from "./components/pages/Company.js";
import NewProject from "./components/pages/NewProject.js";

import Conteiner from "./components/layout/Conteiner";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer"

function App() {
  return (
    <Router>
   <NavBar></NavBar>
      <Conteiner customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/company" element={<Company />} />

          <Route path="/newProject" element={<NewProject />} />
        </Routes>
      </Conteiner>
      <Footer></Footer>
    </Router>
  );
}

export default App;
