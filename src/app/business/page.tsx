'use client';

import {Header} from "@/components/Header/Header";
import { CampaignTable } from "@/components/CampaignTable/CampaignTable";
import {Button, Container} from '@mantine/core';
import classes from "./business.module.css";
import React from "react";
import {NavItem} from "@/components/Header/NavItem/NavItem";
import {Stats} from "@/components/Homepage/Stats";


export default function Home() {
    return (
        <main>
            <Header/>
            <Container size={1440} className={classes.container}>
                <CampaignTable/>
                <div className={classes.button}>
                    <Button size='md' variant="gradient" gradient={{ from: 'yellow', to: 'gold', deg: 90 }}>
                        <NavItem label="Create Fundraising" link="/business/createFund" />
                    </Button>
                </div>
            </Container>
        </main>
    );
}
