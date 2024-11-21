'use client'

import { InvestorRequestDetail } from "@/components/RequestDetails/InvestorRequestDetail";
import {AdminHeader} from "@/components/Header/AdminHeader";
import { useState, useEffect } from 'react';
import {baiSemiBold} from "@/app/(frontend)/styles/fonts";
import classes from "@/app/(frontend)/admin/business/business_list.module.css";
import React from "react";
import {Loader, Stack} from "@mantine/core";

export default function InvestorRequestPage({ params }: { params: { id: string } }) {
    const [investorData, setInvestorData] = useState<any>(null);

    useEffect(() => {
        const fetchInvestorData = async () => {
            const response = await fetch(`/api/admin/investor/${params.id}`);
            const data = await response.json();
            setInvestorData(data);
        };

        fetchInvestorData()
    }, [params.id]);

    if (!investorData) {
        return (
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                <Loader color="goldenrod" type="dots" />
            </Stack>
        );
    }
    return (
        <main>
            <AdminHeader/>
            <main className={baiSemiBold.className}>
                <h1 className={classes.topic}>Investor Detail</h1>
            </main>
            <InvestorRequestDetail investor={investorData} />
        </main>
    );
}
