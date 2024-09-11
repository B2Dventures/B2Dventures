'use client';

import {Header} from "@/components/Header/Header";
import {FundraisingCard} from "@/components/FundraisingCard/FundraisingCard";
import { Grid, Text, Container } from '@mantine/core';
import classes from './investor.module.css';
import { SearchBar } from "@/components/Search/SearchBar";
import { baiSemiBold } from '@/app/styles/fonts'

export default function Home() {

    return (
        <main>
            <Container size={1440}>
                <Header/>
                <SearchBar/>
                <main className={baiSemiBold.className}>
                    <Text className={classes.font} style = {{ marginTop: '50px',marginLeft: '50px', marginBottom: '50px'}}>
                        Live Opportunities
                    </Text>
                </main>

                <Container fluid className={classes.campaign}>
                    <Grid gutter={100}>
                        <Grid.Col span={4}>
                            <FundraisingCard
                                title="B2D Ventures"
                                description="Become a part of world's ventures"
                                imageUrl="/1.ico"
                                raisedAmount="123,456$"
                                investors="123"
                                id={1}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <FundraisingCard
                                title="B2D Ventures"
                                description="Become a part of world's ventures"
                                imageUrl="/1.ico"
                                raisedAmount="123,456$"
                                investors="123"
                                id={2}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <FundraisingCard
                                title="B2D Ventures"
                                description="Become a part of world's ventures"
                                imageUrl="/1.ico"
                                raisedAmount="123,456$"
                                investors="123"
                                id={3}
                            />
                        </Grid.Col>
                    </Grid>
                </Container>
            </Container>
        </main>
    );
}
