"use client";
import React, { useState } from 'react';
import { Image, Group, Card } from '@mantine/core';

interface GalleryProps {
    images: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
    // State to keep track of which image is currently selected
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);

    return (
        <div>
            {/* Main selected image */}
            <Card withBorder shadow="sm" p="lg" radius="md" style={{ marginBottom: 20 }}>
                <Image src={selectedImage} alt="Selected Investment" height={400} fit="cover" />
            </Card>

            {/* Thumbnails */}
            <Group>
                {images.map((img, idx) => (
                    <Card
                        key={idx}
                        onClick={() => setSelectedImage(img)} // Click to change the large image
                        shadow={img === selectedImage ? 'xl' : 'sm'} // Highlight the selected thumbnail
                        withBorder
                        radius="md"
                        style={{ cursor: 'pointer' }}
                    >
                        <Image src={img} alt={`Thumbnail ${idx}`} width={100} height={70} fit="cover" />
                    </Card>
                ))}
            </Group>
        </div>
    );
};
