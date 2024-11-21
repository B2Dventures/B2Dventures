'use client';

import {AdminHeader} from "@/components/Header/AdminHeader";
import {Container, Grid} from '@mantine/core';
import classes from "./admin.module.css";
import React from "react";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts'
import {checkRole} from "@/utils/roles";
import { InvestorPendingCard } from "@/components/AdminCard/InvestorPendingCard";
import {BusinessPendingCard} from "@/components/AdminCard/BusinessPendingCard";
import {CampaignPendingCard} from "@/components/AdminCard/CampaignPendingCard";
import {InvestmentPendingCard} from "@/components/AdminCard/InvestmentPendingCard";


export default function Home() {
    // if (!checkRole('admin')) {
    //     return <p>This is the protected admin dashboard restricted to users with the `admin` role.</p>
    // }
    // else if (checkRole('admin')) {
        return (
            <main>
                <AdminHeader/>
                <Container size={1440}>
                    <main className={baiSemiBold.className}>
                        <h1 className={classes.topic}>Pending Request</h1>
                    </main>
                    <Container fluid className={classes.card}>
                        <Grid gutter={100}>
                            <Grid.Col span={3}>
                                <InvestorPendingCard/>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <BusinessPendingCard/>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <CampaignPendingCard/>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <InvestmentPendingCard/>
                            </Grid.Col>
                        </Grid>
                    </Container>
                </Container>
            </main>
        );
}
// }
