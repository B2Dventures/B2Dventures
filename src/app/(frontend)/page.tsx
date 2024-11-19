'use server';

import React from 'react';
import { Header } from '@/components/Header/Header';
import {Stats} from "@/components/Homepage/Stats";
import { ImageSlide } from '@/components/ImageSlide/ImageSlide'
import { Container, Text, Box } from '@mantine/core';
import classes from './index.module.css';
import {arimoRegular, baiBold} from "@/app/(frontend)/styles/fonts";

export default async function Home() {
    return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} >
        <Header />
        <Container size={1440} style={{ flex : 1}}>
            <Box p="xl">
                <div className={baiBold.className}>
                    <Text
                        variant="gradient"
                        gradient={{from: '#000000', to: 'goldenrod', deg: 90}}
                        fw={1000}
                        component="span"
                        className={classes.bigtext}
                    >
                        B2D Ventures
                    </Text>
                </div>
                <div className={arimoRegular.className}>
                    <Text className={classes.smalltext}>Become a part of world’s ventures</Text>
                </div>
                <ImageSlide/>
            </Box>
        </Container>
        <Stats/>
    </main>

    );
}
