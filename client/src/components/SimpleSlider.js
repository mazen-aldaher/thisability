import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Sample images or content
const images = [
  'https://via.placeholder.com/600x400?text=Slide+1',  'https://via.placeholder.com/600x400?text=Slide+1',

    'https://via.placeholder.com/600x400?text=Slide+1',

];

const TestSlider = () => {
  // Check if there's only one slide
  const isSingleSlide = images.length === 1;

  const settings = {
    dots: !isSingleSlide, // Hide dots if only one slide
    infinite: !isSingleSlide, // Disable infinite loop if only one slide
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Show one slide
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable auto-play
    autoplaySpeed: 2000, // Delay between transitions
    pauseOnHover: true, // Pause on hover
  };

  return (
    <div>
      <h2> Simple React Slick Slider </h2>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestSlider;
