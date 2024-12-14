"use client";

import { Header } from "@/components/Header/Header";
import { Container } from '@mantine/core';
import { InvestorDashboard } from '@/components/InvestorDashboard/InvestorDashboard';
import { baiSemiBold } from '@/app/(frontend)/styles/fonts';
import classes from "./dashboard.module.css";
import React, { useState, useEffect } from 'react';
import {} from "types/api";

export default function InvestorDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<[] | null>(null);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const response = await fetch('/api/investment/');
                if (!response.ok) {
                    throw new Error('Failed to fetch investments');
                }
                const result = await response.json();
                setData(result.investments);
            } catch (error) {
                console.error(error);
                window.location.href = '/error';
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments();
    }, []);

    return (
        <main className={classes.main}>
            <Header />
            <Container size={1440} className={classes.container}>
                <section className={baiSemiBold.className}>
                    <h1 className={classes.topic}>Your Investment</h1>
                </section>
                <section className={classes.table}>
                    <InvestorDashboard data={data} loading={loading} />
                </section>
            </Container>
        </main>
    );
}
