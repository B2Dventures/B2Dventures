'use client'

import { AdminHeader } from "@/components/Header/AdminHeader";
import { useState, useEffect } from 'react';
import React from "react";
import { baiSemiBold } from "@/app/(frontend)/styles/fonts";
import classes from "@/app/(frontend)/admin/investment/investment_list.module.css";
import { InvestmentRequestDetail } from "@/components/RequestDetails/InvestmentRequestDetail";
import {Loader, Stack} from "@mantine/core";

export default function InvestmentRequestPage({ params }: { params: { id: string } }) {
    const [investmentData, setInvestmentData] = useState<any>(null);

    useEffect(() => {
        const fetchInvestmentData = async () => {
            const response = await fetch(`/api/admin/investment/${params.id}`);
            const data = await response.json();
            setInvestmentData(data);
        };

        fetchInvestmentData();
    }, [params.id]);

    if (!investmentData) {
        return (
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                <Loader color="goldenrod" type="dots" />
            </Stack>
        );
    }

    return (
        <main>
            <AdminHeader />
            <main className={baiSemiBold.className}>
                <h1 className={classes.topic}>Investment Detail</h1>
            </main>
            {investmentData ? (
                <InvestmentRequestDetail investment={investmentData} />
            ) : (
                <div>Failed to load investment details</div>
            )}
        </main>
    );
}
