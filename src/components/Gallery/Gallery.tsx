"use client";
import React, { useState } from 'react';
import {Image, Group, Card, Container} from '@mantine/core';
import {Carousel} from "@mantine/carousel";
import {ImageBig} from "@/components/Gallery/ImageBig/ImageBig";
import {ImageSmall} from "@/components/Gallery/ImageSmall/ImageSmall";

interface GalleryProps {
    images: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
    // State to keep track of which image is currently selected


    const [selectedImage, setSelectedImage] = useState(0);

    const handleSlideChange = (index: number) => {
        setSelectedImage(index);
    }

    return (
        <div>
            {/* Main selected image */}
            <Container size={408}>
            <Carousel
                initialSlide = {0}
                onSlideChange={handleSlideChange}
            >
                {images.map((image, index) => (
                    <Carousel.Slide key={index}>
                        <ImageBig
                            imgSrc={image}
                        />
                        {index}
                    </Carousel.Slide>
                ))}
            </Carousel>

            <Carousel
                withIndicators
                slideSize="33.333333%"
                slideGap="md"
                loop
                align="start"
                slidesToScroll={3}
                onSlideChange={handleSlideChange}
            >
                {images.map((image, index) => (
                    <Carousel.Slide key={index}>
                        <ImageSmall
                            imgSrc={image}
                        />
                        {index}
                    </Carousel.Slide>
                ))}
            </Carousel>
            </Container>


            {/* Thumbnails */}

        </div>
    );
};
