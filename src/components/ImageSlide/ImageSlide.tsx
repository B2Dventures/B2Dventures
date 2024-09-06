'use client';

import { React, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { ImageHolder } from '@/components/ImageSlide/ImageHolder/ImageHolder';
import classes from './ImageSlide.module.css';

const images = [
  { imgSrc: '/1.ico', imgAlt: 'Business 1', linkUrl: '/campaign/[id]' },
  { imgSrc: '/2.ico', imgAlt: 'Business 2', linkUrl: '/campaign/[id]' },
  { imgSrc: '/3.ico', imgAlt: 'Business 3', linkUrl: '/campaign/[id]' },
  { imgSrc: '/4.ico', imgAlt: 'Business 4', linkUrl: '/campaign/[id]' },
  { imgSrc: '/5.ico', imgAlt: 'Business 5', linkUrl: '/campaign/[id]' },
];

export const ImageSlide: React.FC = () => {
  const autoplay = useRef(Autoplay({ delay: 3700 }));

  return (
    <div style={{ marginTop: '100px' }}>
      <Carousel
        height={300}
        slideSize="33.333333%"
        slideGap="xl"
        align='start'
        withIndicators
        dragFree
        loop
        plugins={[autoplay.current]}
        onMouseLeave={autoplay.current.reset}
        onMouseEnter={autoplay.current.stop}
        classNames={classes}
      >
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            <ImageHolder
              imgSrc={image.imgSrc}
              imgAlt={image.imgAlt}
              linkUrl={image.linkUrl}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};
