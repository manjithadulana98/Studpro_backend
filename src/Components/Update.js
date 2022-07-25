/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { Container, Navbar,Nav, NavDropdown } from 'react-bootstrap';
import { storage } from "../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import {v4} from "uuid";

import "../App.css";
import { db} from "../firebase-config";
// import storage from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function Update() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl , setImageUrl] = useState("");
    
  const [newAge, setNewAge] = useState("");

  const [users, setUsers] = useState([]);
  const [companys, setCompanys] = useState([]);

  // Create the variable for the new Companies

  const [newName, setNewName] = useState("");
  const [newLogo, setNewLogo] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newDetails, setNewDetails] = useState("");

  const usersCollectionRef = collection(db, "users");
  const CompanyColltectionRef  = collection(db,"Sponsors");

  

  const createCompany = async () => {
    await addDoc(CompanyColltectionRef, { name: newName, years: newYear ,  logo: newLogo ,details: newDetails});
    
  };

  const updateUser = async (id, newName,newYear,newDetails) => {
    console.log("Updating..........  ")
    const userDoc = doc(db, "Sponsors", id);
    const newFields = { name: newName.toString(), years: newYear.toString()  ,details: newDetails.toString() };
    await updateDoc(userDoc, newFields);
    console.log("Updated ")
  };

  const deleteCompany= async (id) => {
    console.log("Updating........... ")
    const userDoc = doc(db, "Sponsors", id);
    await deleteDoc(userDoc);
    console.log("Deleted ")
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

  const [selected, setSelected] = useState(companys.id);

  const handleChange = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
 
  return (
    <div>
      <div>
      <select value={selected} onChange={handleChange}>
        {companys.map(option => (
          <><option key={option.id} value={option.id}>
            {option.name}
          </option></>
          
        ))}
      </select>

      <div>
        <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      </div> 
      <div>
      <input
        placeholder="details ...."
        onChange={(event) => {
          setNewDetails(event.target.value);
        }}
      />
      </div>
      <div>
      <input
        placeholder="years..."
        onChange={(event) => {
          setNewYear(event.target.value);
        }}
      />
      </div>
      <button onClick={() => {
                updateUser(selected,newName,newYear,newDetails);
              } }> 
      Update Card 
      </button>

      <button
              onClick={() => {
                deleteCompany(selected);
              } }
            >
              {" "}
              Delete User

      </button>
      <h>{selected}</h>
      
      {/* <img src={ url|| "http://via.placeholder.com/300"} alt="firebase-image" /> */}

    </div>
      <div>
        {/* <p>{item.logo}</p>
        <p>{item.details}</p>
        <p>{item.years}</p>
        <p>{item.name}</p> */}

      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        placeholder="details ...."
        onChange={(event) => {
          setNewDetails(event.target.value);
        }}
      />
      <input
        placeholder="years..."
        onChange={(event) => {
          setNewYear(event.target.value);
        }}
      />

      <button onClick={createCompany}> Add Company</button>

      
      <div>
        <h1>Update and Delete Company Cards</h1>
      {companys.map((items) => {
        return(
        <>
        <div></div>
        <h>{items.name}</h>
            
        
        <div>
        <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      </div> 
      <div>
      <input
        placeholder="details ...."
        onChange={(event) => {
          setNewDetails(event.target.value);
        }}
      />
      </div>
      <div>
      <input
        placeholder="years..."
        onChange={(event) => {
          setNewYear(event.target.value);
        }}
      />
      </div>

      <button onClick={() => {
                updateUser(items.id,newName,newYear,newDetails);
              } }> 
      Update Card 
      </button>

      <button
              onClick={() => {
                deleteCompany(items.id);
              } }
            >
              {" "}
              Delete User

      </button>
      
      </>
          

          
        
        
        )
      })}

      
      </div>

      </div>
      

      
  
  </div>
  
  )

}

export default Update