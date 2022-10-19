import { Container, Navbar} from 'react-bootstrap';
import Divider from '@mui/material/Divider';
import "../App.css";

import {render} from "react-dom";

import logo from '../assets/images/studpro_logo.png';

import Update from "../Components/Update";
import Upload from "../Components/Upload";
import Login from "../Components/Login";
import UseToken from "../Components/UseToken";

function Home() {

  const { token, setToken } = UseToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div style={{ 
      backgroundColor: 'black',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      }}>

      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="120"
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Brand href="#home">Studpro 5.0 Admin </Navbar.Brand>
        
        </Container>
      </Navbar>

      <Divider>Create Company Cards</Divider>
      <Upload/>
      <Divider>Update Company Cards</Divider>
      <Update/>
      
    </div>
  );
}

export default Home;
render(<Upload/>, document.querySelector("#root"));