'use client';

import {Header} from "@/components/Header/Header";
import {Button, Container, Divider, Grid, Group, Text} from '@mantine/core';
import classes from "./admin.module.css";
import React from "react";
import {NavItem} from "@/components/Header/NavItem/NavItem";
import { ApprovalTable } from "@/components/ApprovalTable/ApprovalTable";
import { baiSemiBold } from '@/app/styles/fonts'



export default function Home() {
    return (
        <main>
            <Header/>
            <Container size={1440}>
                <main className={baiSemiBold.className}>
                    <h1 className={classes.topic}>Approval Request list</h1>
                </main>
                <main className={classes.table}>
                    <ApprovalTable/>
                </main>
            </Container>
        </main>
    );
}
