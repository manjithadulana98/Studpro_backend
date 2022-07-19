import React from 'react';
import { Card,Col,Row } from 'react-bootstrap';
import '../App.css';
import CountUp from 'react-countup';

import { useState, useEffect } from "react";


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';





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

function CompanyCards() {
    const [companys, setCompanys] = useState([]); 

    const CompanyColltectionRef  = collection(db,"Sponsors");

    useEffect(() => {
        
        const getCompany = async () => {
          const data = await getDocs(CompanyColltectionRef);
          setCompanys(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        
        getCompany();
      }, [CompanyColltectionRef]);

      


    return(
        <Row xs={1} md={3} className="g-4">
        const links = (this.props.link);
        {companys.map((item, idx) => (

          
            <ImageListItem key={item.logo}>
            <img
              src={`${item.logo}?w=248&fit=crop&auto=format`}
              srcSet={`${item.logo}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.year}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
            // <Col >
            // <Card raised className="BeerListItem-main-card">
            //     <Card.Img variant="top" src={anObjectMapped.logo} className="BeerListItem-img" />
                
            //         <Card.Title>{anObjectMapped.name}</Card.Title>
            //         {/* <Card.Title>{anObjectMapped.logo}</Card.Title> */}
            //         {/* <Card.Text>
            //         This is a wider card with supporting text below as a natural lead-in to
            //         additional content. This content is a little bit longer.
            //         </Card.Text> */}
            //         <div style={{fontSize:'100px' }}>
            //         <CountUp 
            //         start={0}
            //         end={anObjectMapped.years}
            //         duration={3}
            //         />
            //         </div>
            //         {/* <Card.Text>Last updated 3 mins ago</Card.Text> */}
               
            //     {/* <Card.Body>
            //     <Card.Title>{anObjectMapped.email}</Card.Title>
            //     <Card.Text>
            //         This is a longer card with supporting text below as a natural
            //         lead-in to additional content. This content is a little bit longer.
            //     </Card.Text>
            //     </Card.Body> */}
            // </Card>
            // </Col>
        ))}
        </Row>
    )
}

export default CompanyCards;

// const data =[{
//     image: batman,
//     email: 'batman'
//  },
//  {
//     image: superman,
//     email: 'superman'
//  },
//  {
//     image: batman,
//     email: 'batman'
//  },
//  {
//     image: superman,
//     email: 'superman'
//  },
//  {
//     image: batman,
//     email: 'batman'
//  },
//  {
//     image: superman,
//     email: 'superman'
//  }
// ];