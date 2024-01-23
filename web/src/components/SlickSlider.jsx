import React, { useState, useRef, useEffect } from 'react';
import { useLocation,  useNavigate } from 'react-router-dom';
import Slider from "react-slick";

import slider1 from '../assets/lua.jpg'
import slider2 from '../assets/ngo.jpg'
import slider3 from '../assets/dua.jpg'
import slider4 from '../assets/lan.jpg'


const arrImages=[slider1,slider2,slider3,slider4]
export const SlickSlider = () => {
    const ref = useRef({});
    const navigate = useNavigate()
    const settings = {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        className: 'z-10'
        };
    const handleClick = (index) => {
        // console.log(index)
        navigate(`/genus/${index+1}`)
        }
  return (
        <div className='w-full relative z-5 p-6'>
              <Slider  {...settings}>
                  {arrImages.map((item,index) => {
                      return (
                
                            <img
                                className='w-full h-[300px] cursor-pointer '
                                key={index}
                                src={item}
                                onClick={() =>handleClick(index)}
                            />
                       
                      
                    )
                  })}
              </Slider>
            
           </div>

  )
}
