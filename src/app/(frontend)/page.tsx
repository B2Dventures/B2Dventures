'use client';

import Image from 'next/image';
import React from 'react';
import { Header } from '@/components/Header/Header';
import {Stats} from "@/components/Homepage/Stats";
import { ImageSlide } from '@/components/ImageSlide/ImageSlide'
import { Container, Text, Box } from '@mantine/core';
import classes from './index.module.css';
import {arimoRegular, baiBold} from "@/app/(frontend)/styles/fonts";

export default async function Home() {
  return (
    <main>
        <Header />
        <Container size={1440} >

      <Box p="xl">
          <main className={baiBold.className}>
        <Text
          variant="gradient"
          gradient={{ from: '#000000', to: 'goldenrod', deg: 90 }}
          fw={1000}
          component="span"
          className={classes.bigtext}
        >
          B2D Ventures
        </Text>
          </main>
          <main className={arimoRegular.className}>
        <Text className={classes.smalltext}>Become a part of world’s ventures</Text>
          </main>
        <ImageSlide />
      </Box>
        </Container>
        <Stats />
    </main>
  );
}
