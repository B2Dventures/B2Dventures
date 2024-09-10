'use client';

import Image from 'next/image';
import React from 'react';
import { Header } from '@/components/Header/Header';
import {Stats} from "@/components/Homepage/Stats";
import { ImageSlide } from '@/components/ImageSlide/ImageSlide'
import { Container, Text, Box } from '@mantine/core';
import classes from './index.module.css';

export default function Home() {
  return (
    <main>
        <Header />
        <Container size={1440} >

      <Box p="xl">
        <Text
          variant="gradient"
          gradient={{ from: '#000000', to: 'goldenrod', deg: 90 }}
          fw={1000}
          component="span"
          style={{ fontSize: '95px' }}
        >
          B2D Ventures
        </Text>
        <Text style={{ fontSize: '20px' }}>Become a part of world’s ventures</Text>
        <ImageSlide />
      </Box>
        </Container>
        <Stats />
    </main>
  );
}
