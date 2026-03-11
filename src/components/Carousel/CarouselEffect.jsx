import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import classes from './Carousel.module.css';
import {img} from './img/data'
const CarouselEffect = () => {
  return (
    <div className={classes.carousel_container}>
        <Carousel 
            autoPlay={true}          // Mimics Amazon's shifting banners
            infiniteLoop={true}      // Loops back to the start
            showIndicators={false}   // Amazon usually uses simple arrows or hidden dots
            showThumbs={false}       // Hides the row of small thumbnails
            showStatus={false}       // Hides "1 of 5" status text
            interval={3000}          // 3 seconds between slides
            transitionTime={1000}     // Smooth animation
        >
            {img.map((imgLink) =>{
                return <img src={imgLink}/>
            })}
        </Carousel>
        
        {/* This div acts as a gradient fade into the product section */}
        <div className={classes.hero_img_fade}></div>
    </div>
  )
}

export default CarouselEffect;