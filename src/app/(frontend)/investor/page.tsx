'use client';

import { useEffect, useState } from 'react';
import {Header} from "@/components/Header/Header";
import {FundraisingCard} from "@/components/FundraisingCard/FundraisingCard";
import { Grid, Text, Container, Group, Button } from '@mantine/core';
import classes from './investor.module.css';
import { SearchBar } from "@/components/Search/SearchBar";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts'
import {Investor} from "@prisma/client";

interface Business {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    investors: number;
}


export default async function InvestorPage() {
    const res = await fetch("http://localhost:3000/api/campaign", {cache: "force-cache"});
    const [prop, setProb] = useState<Business[]>([]);
    if (res.status === 200) {
        try {
            const data = await res.json();
            setProb(data);
        }
        catch (error) {
            console.error('Failed to fetch campaign:', error);
        }
    }

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
                      style={{marginTop: '50px', marginLeft: '150px', marginBottom: '50px', fontSize: '35px'}}>
                    Live Opportunities
                </Text>
                <Container fluid className={classes.campaign}>
                    <Grid gutter={100}>
                            {prop.map(business => (
                                <Grid.Col span={4}>
                                <FundraisingCard
                                  title={business.name}
                                  description={business.description}
                                  imageUrl={business.image}
                                  raisedAmount={business.price.toString()}
                                  investors={business.investors.toString()}
                                  id={business.id}
                                />
                                </Grid.Col>
                            ) )}
                    </Grid>
                </Container>
            </Container>
        </main>
    );
}
