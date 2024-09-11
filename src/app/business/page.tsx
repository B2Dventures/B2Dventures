'use client';

import {Header} from "@/components/Header/Header";
import { CampaignTable } from "@/components/CampaignTable/CampaignTable";
import {Button, Container} from '@mantine/core';
import classes from "./business.module.css";
import React from "react";
import {NavItem} from "@/components/Header/NavItem/NavItem";


export default function Home() {
    return (
        <main>
            <Header/>
            <Container size={1440} className={classes.container}>
                <CampaignTable/>
                <Button size='xs' variant="gradient" gradient={{ from: 'yellow', to: 'gold', deg: 90 }}>
                    <NavItem label="Create Fundraising" link="/createFund" />
                </Button>
            </Container>
        </main>
    );
}
