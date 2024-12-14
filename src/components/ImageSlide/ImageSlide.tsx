'use client';

import React, { useEffect, useState, useRef } from "react";
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { ImageHolder } from '@/components/ImageSlide/ImageHolder/ImageHolder';
import classes from './ImageSlide.module.css';

interface Campaign {
    id: number;
    name: string;
    image: string;
}

export const ImageSlide: React.FC = () => {
  const autoplay = useRef(Autoplay({ delay: 3700 }));
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
        try {
            const response = await fetch("/api/campaign/slide");
            const data = await response.json();
            setCampaigns(data);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            window.location.href = '/error';
        }
    };

    fetchCampaigns();
    }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <Carousel
        height={300}
        slideSize="33.333333%"
        slideGap="xl"
        align='center'
        withIndicators
        dragFree
        loop
        plugins={[autoplay.current]}
        onMouseLeave={autoplay.current.reset}
        onMouseEnter={autoplay.current.stop}
        classNames={classes}
      >
          {campaigns.map((campaign) => (
              <Carousel.Slide key={campaign.id}>
                  <ImageHolder
                      imgSrc={campaign.image}
                      imgAlt={campaign.name}
                      linkUrl={`/investor/${campaign.id}`}
                  />
              </Carousel.Slide>
          ))}
      </Carousel>
    </div>
  );
};
