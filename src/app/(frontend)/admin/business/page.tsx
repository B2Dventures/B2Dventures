'use client';

import {AdminHeader} from "@/components/Header/AdminHeader";
import { Container } from '@mantine/core';
import classes from "./business_list.module.css";
import React from "react";
import { BusinessApprovalTable } from "@/components/ApprovalTable/BusinessApprovalTable";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts'



export default function Home() {
        return (
            <main>
                <AdminHeader/>
                <Container size={1440}>
                    <main className={baiSemiBold.className}>
                        <h1 className={classes.topic}>Business Approval Request list</h1>
                    </main>
                    <main className={classes.table}>
                        <BusinessApprovalTable/>
                    </main>
                </Container>
            </main>
        );
    }
