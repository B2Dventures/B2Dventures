"use client";

import React, { useState } from 'react';
import {Image, Card, Text} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './Gallery.module.css';
import {baiSemiBold} from "@/app/(frontend)/styles/fonts";

interface GalleryProps {
    title: string;
    description: string;
    images: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ title, description, images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  return (
      <div>
          <div>
              <Text className={baiSemiBold.className}
                    style = {{ marginTop: '50px', fontSize: '70px'}}>
                  B2D Ventures
              </Text>
              <Text style = {{ fontSize: '25px', fontWeight: '200'}}>
                  Become a part of world's ventures
              </Text>
          </div>
          <Card withBorder shadow="sm" p="lg" radius="md" style={{ marginBottom: 20, marginTop: 50 }}>
            <Card.Section>
              <Image src={selectedImage} alt="Selected Investment" height={450} fit="cover" style={{borderRadius:'5px'}} />
            </Card.Section>
          </Card>

          <Carousel
            height={250}
            slideSize="25%"
            slideGap='xs'
            loop
            align="start"
            onSlideChange={index => setSelectedImage(images[index])}
            classNames={classes}
          >
            {images.map((img, idx) => (
              <Carousel.Slide key={idx}>
                <Card
                  onClick={() => setSelectedImage(img)}
                  shadow={img === selectedImage ? 'xl' : 'sm'}
                  withBorder
                  radius="md"
                  p="lg"
                  style={{ cursor: 'pointer', height: '200', width: '200' }}
                >
                  <Card.Section
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      height: '200',
                      width: '200'
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      height="170"
                      width="170"
                    />
                  </Card.Section>
                </Card>
              </Carousel.Slide>
            ))}
          </Carousel>
      </div>
  );
};
