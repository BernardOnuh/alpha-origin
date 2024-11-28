import React from 'react'
import Slider from "react-slick";
import Image from 'next/image';
import Link from 'next/link';
import partner1 from '../public/images/IMG_6192.JPG'
import partner2 from '../public/images/IMG_6193.JPG'
import partner3 from '../public/images/IMG_6188.JPG'
import partner4 from '../public/images/IMG_6189.JPG'
import partner5 from '../public/images/IMG_6190.JPG'
import partner6 from '../public/images/IMG_6191.JPG'
import partner7 from '../public/images/IMG_6195.JPG'




export default function Hero() {
  const settings = {
    // dots: false,
    // arrows: false,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 8,
    // slidesToScroll: 1,
    // autoplay: true,
    // speed: 2000,
    // autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    speed: 2000,
    autoplaySpeed: 2000, // Set autoplaySpeed to 0 for continuous scrolling
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 7,

        }
      },
      {
        breakpoint: 1511,
        settings: {
          slidesToShow: 6,

        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 822,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 415,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
    ]
  };
  return (
    <div className=' w-[90%] mx-auto sm:pt-[96px] pt-[64px] text-center ' >
      <h2 className=' f-f-r-b font-medium  text-3xl sm:text-3xl md:text-4xl text-primary  ' >
        Alpha Origins Survivors
      </h2>

      <Slider {...settings} className=' my-12 ' >
    <Link href="">
        <div>
          <Image src={partner1} alt="image" className=' w-[90%]  h-[162px] mx-auto  object-cover rounded-[24px] ' />
        </div>
    </Link>
        <div>
          <Image src={partner2} alt="image" className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] cursor-pointer ' />
        </div>
        <div>
          <Image src={partner3} alt="image" className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] cursor-pointer ' />
        </div>
      <Link href="">
        <div>
          <Image src={partner4} alt="image" className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] cursor-pointer ' />
        </div>
      </Link>
        <div>
          <Image src={partner5} alt="image" className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] cursor-pointer  ' />
        </div>
        <div>
          <Image src={partner6} alt="image" className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] cursor-pointer  ' />
        </div>
    <Link href="/">
        <div>
          <Image src={partner7} alt="image" className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] cursor-pointer ' />
        </div>
    </Link>
        <div>
          <Image src={partner1} alt="image" className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] cursor-pointer ' />
        </div>
    
    <Link href="" >
        <div>
          <Image src={partner2} alt="image" className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] cursor-pointer ' />
        </div>
    </Link>
  {/* <div>
          <img src={partner2} className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] ' />
        </div>
  <div>
          <img src={partner3} className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] ' />
        </div>
        <div>
          <img src={partner4} className=' w-[90%] h-[162px] mx-auto  object-cover rounded-[24px] ' />
        </div>*/}
      </Slider>
    </div>
  )
}