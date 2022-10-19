import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Components/CSS/Login.css';


async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    console.log(token.token);
    console.log(username + password);
    if (token.token === (username + password)) {
      setToken(token);
    }
    
  }

  return(
    <div className="body">
      <div className="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Log In</h3>
        <label>
          <p className='head'>Username</p>
          <input className="input" type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p className='head'>Password</p>
          <input className="input" type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button className="button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};