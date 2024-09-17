'use client';

import {Header} from "@/components/Header/Header";
import { CampaignTable } from "@/components/CampaignTable/CampaignTable";
import {Button, Container, Divider, Grid, Group, Text} from '@mantine/core';
import classes from "./business.module.css";
import React from "react";
import {NavItem} from "@/components/Header/NavItem/NavItem";
import {LuCheckCircle, LuDollarSign, LuUsers} from "react-icons/lu";
import { baiSemiBold } from '@/app/styles/fonts'



export default function Home() {
    return (
        <main>
            <Header/>
            <Container size={1440}>
                <main className={baiSemiBold.className}>
                    <h1 className={classes.topic}>All Campaigns list</h1>
                </main>
                <main className={classes.table}>
                    <CampaignTable/>
                </main>

            </Container>
            <footer className={classes.footer}>
                <Container className={classes.inner} size={1440}>
                    <Group>
                        <div className={classes.box}>
                            <LuDollarSign size={50}/>
                            <Text className={classes.name}>Total Fund Raised</Text>
                            <Text className={classes.number}>$ 610,724</Text>
                        </div>
                        <Divider orientation="vertical" />
                        <div className={classes.box}>
                            <LuUsers size={50}/>
                            <Text className={classes.name}>Total Investors</Text>
                            <Text className={classes.number}>8,117</Text>
                        </div>
                        <Divider orientation="vertical" />
                        <div className={classes.box}>
                            <LuCheckCircle size={50}/>
                            <Text className={classes.name}>Total Campaigns</Text>
                            <Text className={classes.number}>8</Text>
                        </div>
                        <Divider orientation="vertical" />
                    </Group>
                    <Group gap={20} visibleFrom="xs">
                        <Button size='md' variant="gradient" gradient={{from: 'yellow', to: 'gold', deg: 90}} onClick={() => window.location.href="/business/createFund"}>
                            <NavItem label="Create Fundraising" link="/business/createFund"/>
                        </Button>
                    </Group>
                </Container>
            </footer>
        </main>
    );
}
