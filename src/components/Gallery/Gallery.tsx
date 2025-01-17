"use client";

import React, { useState } from 'react';
import { Image, Card } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './Gallery.module.css';

interface GalleryProps {
    images: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);

    return (
        <div>
            <Card withBorder shadow="sm" p="lg" radius="md" style={{ marginBottom: 20, marginTop: 50 }}>
                <Card.Section>
                    <Image src={selectedImage} alt="Selected Investment" height={500} fit="cover" style={{ borderRadius: '5px' }} />
                </Card.Section>
            </Card>

            <Carousel
                height={250}
                slideSize="33%"
                slideGap="xs"
                loop
                align="center"
                onSlideChange={index => { setSelectedImage(images[index]); }}
                classNames={classes}
            >
                {images.map((img, idx) => (
                    <Carousel.Slide key={idx}>
                        <Card
                            onClick={() => { setSelectedImage(img); }}
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
                                    width: '400'
                                }}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    height="170"
                                    width="300"
                                />
                            </Card.Section>
                        </Card>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};
