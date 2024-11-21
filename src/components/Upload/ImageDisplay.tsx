import React from 'react';
import { Box, Text, Button, Image } from '@mantine/core';

interface ImagePreviewProps {
    title: string; // Title for the preview (e.g., 'License Image Preview')
    imageSrc: string | null; // The image source or null if no image is set
    onRemove: () => void; // A function to execute when the remove button is clicked
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ title, imageSrc, onRemove }) => {
    return (
        <Box mt="md" style={{ maxWidth: 200 }}>
            <Text size="sm" mt="md">{title}</Text>
            <div style={{ position: 'relative' }}>
                {imageSrc && (
                    <>
                        <Image
                            src={imageSrc}
                            alt={title}
                            style={{ borderRadius: '8px' }}
                        />
                        <Button
                            size="xs"
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 1,
                                backgroundColor: "transparent",
                                color: 'red',
                            }}
                            onClick={onRemove}
                        >
                            ✕
                        </Button>
                    </>
                )}
            </div>
        </Box>
    );
};

export default ImagePreview;
