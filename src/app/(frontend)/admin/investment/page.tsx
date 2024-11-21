'use client';

import {AdminHeader} from "@/components/Header/AdminHeader";
import { Container } from '@mantine/core';
import classes from "./investment_list.module.css";
import React from "react";
import { InvestmentApprovalTable } from "@/components/ApprovalTable/InvestmentApprovalTable";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts'



export default function Home() {
    return (
        <main>
            <AdminHeader/>
            <Container size={1440}>
                <main className={baiSemiBold.className}>
                    <h1 className={classes.topic}>Investment Approval Request list</h1>
                </main>
                <main className={classes.table}>
                    <InvestmentApprovalTable/>
                </main>
            </Container>
        </main>
    );
}
