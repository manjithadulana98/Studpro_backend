import { useState, useEffect } from "react";
import { Container, Navbar,Nav, NavDropdown } from 'react-bootstrap';

import "./App.css";
import { db} from "./firebase-config";
// import storage from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import CarouselContainer from "./Components/CarouselContainer";
import { FooterContainer } from './Components/footer'
// import CompanyCards from "./Components/CompanyCards";

import {render} from "react-dom";



import logo from './assets/images/logo.jpg';
import Album from "./Components/Copyright";
import Update from "./Components/Update";
import Upload from "./Components/Upload";

// import NavbarContainer from "./Components/NavbarContainer";

function App() {
  
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const [companys, setCompanys] = useState([]);

  const usersCollectionRef = collection(db, "users");
  const CompanyColltectionRef  = collection(db,"Sponsors");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getCompany = async () => {
      const data = await getDocs(CompanyColltectionRef);
      setCompanys(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    getCompany();
  }, [usersCollectionRef,CompanyColltectionRef]);

  return (
    <div>
      {/* <NavbarContainer/> */}

      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Brand href="#home">Studpro 5.0</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">About Us</Nav.Link>
          <NavDropdown href="#features" title= 'past events'>
            <NavDropdown.Item href="#action/3.1">Studpro 1.0</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Studpro 2.0</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Studpro 3.0</NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
            <NavDropdown.Item href="#action/3.4">Studpro 4.0</NavDropdown.Item>
          </NavDropdown>        
          <Nav.Link href="#pricing">Contact us</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      {/* <CarouselContainer/>
      <Album/>
      <FooterContainer /> */}
      <Upload/>
      <Update/>
    </div>
  );
}

export default App;
render(<Upload/>, document.querySelector("#root"));