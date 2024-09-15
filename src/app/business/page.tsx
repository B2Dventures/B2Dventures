'use client';

import {Header} from "@/components/Header/Header";
import { CampaignTable } from "@/components/CampaignTable/CampaignTable";
import {Button, Container, Grid, Group, Text} from '@mantine/core';
import classes from "./business.module.css";
import React from "react";
import {NavItem} from "@/components/Header/NavItem/NavItem";
import {LuCheckCircle, LuDollarSign, LuUsers} from "react-icons/lu";


export default function Home() {
    return (
        <main>
            <Header/>
            <Container size={1440} className={classes.table}>
                <CampaignTable/>
            </Container>
            <footer className={classes.footer}>
                <Container className={classes.inner} size={1440}>
                    <Group>
                        <Grid>
                            <Grid.Col span={4}>
                                <div className={classes.box}>
                                    <LuDollarSign size={50}/>
                                    <Text className={classes.name}>Total Fund Raised</Text>
                                    <Text className={classes.number}>$ 610,724</Text>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <div className={classes.box}>
                                    <LuUsers size={50}/>
                                    <Text className={classes.name}>Total Investors</Text>
                                    <Text className={classes.number}>8,117</Text>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <div className={classes.box}>
                                    <LuCheckCircle size={50}/>
                                    <Text className={classes.name}>Total Campaigns</Text>
                                    <Text className={classes.number}>8</Text>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Group>
                    <Group gap={20} visibleFrom="xs">
                        <Button size='md' variant="gradient" gradient={{from: 'yellow', to: 'gold', deg: 90}}>
                            <NavItem label="Create Fundraising" link="/business/createFund"/>
                        </Button>
                    </Group>
                </Container>
            </footer>
        </main>
    );
}
