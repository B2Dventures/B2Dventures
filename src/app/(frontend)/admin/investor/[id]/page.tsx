'use client';

import {Container} from "@mantine/core";
import {AdminHeader} from "@/components/Header/AdminHeader";
import React from "react";
import {InvestorRequestDetail} from "@/components/RequestDetails/InvestorRequestDetail";
import {baiSemiBold} from "@/app/(frontend)/styles/fonts";
import classes from "@/app/(frontend)/admin/business/business_list.module.css";


export default function Home() {
    return (
        <main>
            <AdminHeader/>
            <main className={baiSemiBold.className}>
                <h1 className={classes.topic}>Investor Detail</h1>
            </main>
            <InvestorRequestDetail/>
        </main>
    );
}
