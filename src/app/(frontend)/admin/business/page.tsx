'use client';

import {AdminHeader} from "@/components/Header/AdminHeader";
import { Container } from '@mantine/core';
import classes from "./business_list.module.css";
import React from "react";
import { ApprovalTable } from "@/components/ApprovalTable/ApprovalTable";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts'
import {checkRole} from "@/utils/roles";



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
                        <h1 className={classes.topic}>Business Approval Request list</h1>
                    </main>
                    <main className={classes.table}>
                        <ApprovalTable/>
                    </main>
                </Container>
            </main>
        );
    }
// }
