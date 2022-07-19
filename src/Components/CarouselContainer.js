import React from 'react';
import {Carousel} from 'react-bootstrap';
import '../App.css';
import { useState, useEffect } from "react";

import { db} from "../firebase-config";

import image1 from './../assets/images/1.jpg';
import image2 from './../assets/images/2.jpg';
import image3 from './../assets/images/3.jpg';

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const CarouselContainer =() =>{
  const [carousel, setCarousel] = useState([]);

  const CarouselColltectionRef  = collection(db,"Carousel");

  useEffect(() => {
        
    const getCarousel = async () => {
      const data = await getDocs(CarouselColltectionRef);
      setCarousel(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    
    getCarousel();
  }, [CarouselColltectionRef]);


    return(
        <Carousel controls={false} fade = {true} pause = {false} >
        {/* const links = (this.props.link); */}
        {carousel.map((item, idx) => (
          <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={item.image}
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        ))},
        
        {/* <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={image3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>  
        
    )

}

export default CarouselContainer