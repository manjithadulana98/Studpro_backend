import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
    await addDoc(CompanyColltectionRef, { name: newName, years: newYear ,  logo: url ,details: newDetails});
    
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
            setUrl(downloadURL);
          });
      }
    );
  };

//   console.log("image: ", image);

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />

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
    </div>
  );
}

export default Upload
