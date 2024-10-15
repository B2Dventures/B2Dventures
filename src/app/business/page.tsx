'use client';

import {Header} from "@/components/Header/Header";
import { CampaignTable } from "@/components/CampaignTable/CampaignTable";
import {Button, Container, Divider, Grid, Group, Text} from '@mantine/core';
import classes from "./business.module.css";
import React, {useState} from "react";
import {NavItem} from "@/components/Header/NavItem/NavItem";
import {LuCheckCircle, LuDollarSign, LuUsers} from "react-icons/lu";
import { baiSemiBold } from '@/app/styles/fonts'
import {checkRole} from "@/utils/roles";

interface Business {
    id: string;
    name: string;
    goal: number;
    raised: number;
    investors: number;
    status: string;
}


export default async function BusinessPage() {
    const role = checkRole("business");
    if (!role) {
        return <div>Not Business</div>
    }
    const res = await fetch("http://localhost:3000/api/business", {cache: "force-cache"});
    const [prop, setProb] = useState<Business[]>([]);
    if (res.status === 200) {
        try {
            const data = await res.json();
            setProb(data);
        } catch (error) {
            console.error('Failed to fetch business:', error);
        }
    }
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
                        <Divider orientation="vertical"/>
                        <div className={classes.box}>
                            <LuUsers size={50}/>
                            <Text className={classes.name}>Total Investors</Text>
                            <Text className={classes.number}>8,117</Text>
                        </div>
                        <Divider orientation="vertical"/>
                        <div className={classes.box}>
                            <LuCheckCircle size={50}/>
                            <Text className={classes.name}>Total Campaigns</Text>
                            <Text className={classes.number}>8</Text>
                        </div>
                        <Divider orientation="vertical"/>
                    </Group>
                    <Group gap={20} visibleFrom="xs">
                        <Button size='md' variant="gradient" gradient={{from: 'yellow', to: 'gold', deg: 90}}
                                onClick={() => window.location.href = "/business/createFund"}>
                            <NavItem label="Create Fundraising" link="/business/createFund"/>
                        </Button>
                    </Group>
                </Container>
            </footer>
        </main>
    );
}
