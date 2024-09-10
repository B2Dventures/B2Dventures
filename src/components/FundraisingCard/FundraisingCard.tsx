'use client';

import React from 'react';
import { Card, Image, Text, Group } from '@mantine/core';
import classes from './FundraisingCard.module.css';


interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    raisedAmount: string;
    investors: string;
    id : number;
}

export const FundraisingCard: React.FC<CardProps> = ({ title, description, imageUrl, raisedAmount, investors, id }) => {
    return (
            <a href={`/investor/${id}`} style={{ textDecoration: 'none' }}> {/* Ensures the card doesn't show link underlines */}
                <Card shadow="sm" padding="lg" radius="md" className={classes.card}>
                    <Card.Section>
                        <Image src={imageUrl} height={160} alt={title}/>
                    </Card.Section>

                    <Group mt="md" mb="xs">
                        <Text size="lg">{title}</Text>
                    </Group>

                    <Text size="sm">
                        {description}
                    </Text>

                    <Group mt="md" className={classes.stat}>
                        <Text size="sm">{raisedAmount} raised</Text>
                        <Text size="sm">{investors} Investors</Text>
                    </Group>
                </Card>
            </a>);
};
