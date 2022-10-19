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

import styles from "./CSS/Form.module.scss";


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
    <div className={styles.alignCenter}>
      <div className={styles.formStyle}>

      <h3 className={styles.h3}> Update Company Cards </h3>
        
        <select  className={styles.formDropdown} value={selected} onChange={handleChange}>
          {companys.map(option => (
            <><option key={option.id} value={option.id}>
              {option.name}
            </option></>
            
          ))}
        </select>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
                Name
          </label>
          <input className={styles.input}
          placeholder="Name..."
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        </div> 
        <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">
              Details
        </label>
        <input className={styles.input}
          placeholder="details ...."
          onChange={(event) => {
            setNewDetails(event.target.value);
          }}
        />
        </div>
        <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">
              Years
        </label>
        <input className={styles.input}
          placeholder="years..."
          onChange={(event) => {
            setNewYear(event.target.value);
          }}
        />
        </div>

          <div className={styles.formGroup}>
            <button className={styles.formButton} onClick={() => {
                      updateUser(selected,newName,newYear,newDetails);
                    } }> 
            Update Card 
            </button>
          </div>
          <div className={styles.formGroup}>
            <button className={styles.formButton}
              onClick={() => {deleteCompany(selected);} }
            >
              {" "}
              Delete Card
            </button>
          </div>

      <h>{selected}</h>
    </div>
      
      

      
  
  </div>
  
  )}



export default Update