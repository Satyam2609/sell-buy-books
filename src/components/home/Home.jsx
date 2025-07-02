import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {Data} from "./Data";

const Home = () => {
   
    const items = Data.map((item) => (
        <img className='cursor-pointer lg:h-1/2 lg:w-full w-1/2 h-[100px] z-10' role='presentation' src={item.image} alt="" key={item.id} />
    ));

    return (
        <AliceCarousel
            
            items={items}
            disableButtonsControls
            autoPlay
            autoPlayInterval={2000}
            infinite
          
        />
    );
};

export default Home;
