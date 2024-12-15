'use client';

import React, { useState } from 'react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Text, Group } from '@mantine/core';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { rem } from '@mantine/core';

interface ImageDropProps extends DropzoneProps {
  dropText?: string;
  descriptionText?: string;
}

export const ImageDrop: React.FC<ImageDropProps> = ({ onDrop, dropText, descriptionText }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
    onDrop(files);
  };

  return (
    <div style={{ marginTop: '35px' }}>
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => { console.log('rejected files', files); }}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              {dropText}
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              {descriptionText}
            </Text>
          </div>
        </Group>
      </Dropzone>
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ width: '450px', height: '450px', marginTop: '35px' }} />
      )}
    </div>
  );
};