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
      <Box p="xl">
        <Text
          variant="gradient"
          gradient={{ from: '#000000', to: '#00E2D2', deg: 90 }}
          fw={1000}
          component="span"
          style={{ fontSize: '95px' }}
        >
          B2D Ventures
        </Text>
        <Text style={{ fontSize: '20px' }}>Become a part of world’s ventures</Text>
        <ImageSlide />
      </Box>
      <Stats />
    </main>
  );
}
