'use client';

import {Header} from "@/components/Header/Header";
import {FundraisingCard} from "@/components/FundraisingCard/FundraisingCard";
import { Grid, Text, Container } from '@mantine/core';
import classes from './investor.module.css';

export default function Home() {
    return (
        <main>
            <Header/>
            <Text>Live Opportunities</Text>
            <Container fluid className={classes.campaign}>
                <Grid gutter={100}>
                    <Grid.Col span={4}>
                        <FundraisingCard
                            title="B2D Ventures"
                            description="Become a part of world's ventures"
                            imageUrl="/1.ico"
                            raisedAmount="123,456$"
                            investors="123"
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <FundraisingCard
                            title="B2D Ventures"
                            description="Become a part of world's ventures"
                            imageUrl="/1.ico"
                            raisedAmount="123,456$"
                            investors="123"
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <FundraisingCard
                            title="B2D Ventures"
                            description="Become a part of world's ventures"
                            imageUrl="/1.ico"
                            raisedAmount="123,456$"
                            investors="123"
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </main>
    );
}
