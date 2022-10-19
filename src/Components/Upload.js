import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styles from "./CSS/Form.module.scss";

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


function Upload() {

    const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const [newName, setNewName] = useState("");
//   const [newLogo, setNewLogo] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newDetails, setNewDetails] = useState("");

  const CompanyColltectionRef  = collection(db,"Sponsors");


  const createCompany = async () => {
      alert("Start Uploading.....");
    await addDoc(CompanyColltectionRef, { name: newName, years: newYear ,  logo: url ,details: newDetails});
    alert("Uploaded");
    
  };


  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            alert('File available at', downloadURL);
            setUrl(downloadURL);
          });
      }
    );
  };

//   console.log("image: ", image);

  return (
    <div className={styles.alignCenter}>
      <div className={styles.formStyle}>
      
      <h3 className={styles.h3}> Upload Company Cards </h3>
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
              Description
        </label>   
      <input className={styles.input}
        placeholder="Description ...."
        onChange={(event) => {
          setNewDetails(event.target.value);
        }}
      />
      
      </div> 

      <div className={styles.formGroup}>
      <label className={styles.label} htmlFor="name">
              Year
      </label>
      <input className={styles.input}
        placeholder="Years..."
        onChange={(event) => {
          setNewYear(event.target.value);
        }}
      />
      </div>
      <div className={styles.formGroup}>
      <label className={styles.label} htmlFor="name">
              Add Company Image
      </label>
      </div>
      
      
      
      <input className={styles.smallButton} type="file" onChange={handleChange} />
      <br />
      <br />
      <progress value={progress} max="100" />
      <br />
      <br />
      <button className={styles.smallButton} onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />

      <button className={styles.formButton} onClick={createCompany}> Add Company</button>
      </div>
    </div>
  );
}

export default Upload
