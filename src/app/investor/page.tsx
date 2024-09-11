'use client';

import {Header} from "@/components/Header/Header";
import {FundraisingCard} from "@/components/FundraisingCard/FundraisingCard";
import { Grid, Text, Container, Group, Button } from '@mantine/core';
import classes from './investor.module.css';
import { SearchBar } from "@/components/Search/SearchBar";
import { baiSemiBold } from '@/app/styles/fonts'

export default function Home() {

    return (
        <main>
            <Header/>
            <Container size={1440}>
                <Container fluid className={classes.searchBox}>
                        <SearchBar/>
                    <Group>
                        <Button size='s' variant="outline" color='rgb(0, 0, 0, 0.6)' radius='16'>Filter</Button>
                        <Button size='s' variant="outline" color='rgb(0, 0, 0, 0.6)' radius='16'>Sort By</Button>
                    </Group>
                </Container>
                <Text className={baiSemiBold.className}
                      style = {{ marginTop: '50px',marginLeft: '150px', marginBottom: '50px', fontSize: '35px'}}>
                    Live Opportunities
                </Text>
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
                        <Grid.Col span={4}>
                            <FundraisingCard
                                title="B2D Ventures"
                                description="Become a part of world's ventures"
                                imageUrl="/1.ico"
                                raisedAmount="123,456$"
                                investors="123"
                                id={4}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <FundraisingCard
                                title="B2D Ventures"
                                description="Become a part of world's ventures"
                                imageUrl="/1.ico"
                                raisedAmount="123,456$"
                                investors="123"
                                id={5}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <FundraisingCard
                                title="B2D Ventures"
                                description="Become a part of world's ventures"
                                imageUrl="/1.ico"
                                raisedAmount="123,456$"
                                investors="123"
                                id={6}
                            />
                        </Grid.Col>
                    </Grid>
                </Container>
            </Container>
        </main>
    );
}
