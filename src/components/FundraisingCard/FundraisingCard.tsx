'use client';

import React from 'react';
import { Card, Image, Text, Group, Stack } from '@mantine/core';
import classes from './FundraisingCard.module.css';


interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    totalInvestment: number;
    investors: number;
    id : number;
}

export const FundraisingCard: React.FC<CardProps> = ({ title, description, imageUrl, totalInvestment, investors, id }) => {
    return (
            <a href={`/investor/${id}`} style={{ textDecoration: 'none' }}>
                <Card shadow="sm" padding="lg" radius="md" className={classes.card}>
                    <Card.Section>
                        <Image src={imageUrl} height={180} alt={title}/>
                    </Card.Section>

                    <Stack mt="md" mb="xs">
                        <Text size="lg" fw="bold">{title}</Text>
                        <Text size="sm">{description}</Text>
                    </Stack>

                    <Group mt="md" className={classes.footer}>
                        <Text size="sm">{totalInvestment} raised</Text>
                        <Text size="sm">{investors} Investors</Text>
                    </Group>
                </Card>
            </a>);
};
