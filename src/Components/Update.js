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
    
  const [newAge, setNewAge] = useState(0);

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

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteCompany= async (id) => {
    const userDoc = doc(db, "Sponsors", id);
    await deleteDoc(userDoc);
  };

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      const progress = (snapshot.byteTransferred /snapshot.totalBytes)*100;
      console.log(progress + "% done ");
      
      switch(snapshot.state){
        case 'paused':
          console.log("upload is paused")
        case 'running':
          console.log("Upload is running");
          break;
      }
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageUrls((prev) => [...prev, url]);
        
        setImageUrl(url);
        console.log('File available at' , {imageUrl});
        alert("Uploaded");
      });
    });
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

      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>

      <div>
        <h1>Update and Delete Company Cards</h1>
      {companys.map((items) => {
        return(
        <><h>{items.name}</h><button
          onClick={() => {
                deleteCompany(items.id);
              }}
            >
              {" "}
              Delete User

          </button></>
        
        
        )
      })}

      
      </div>

      </div>
      

      
  
  </div>
  
  )

}

export default Update