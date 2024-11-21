'use client';

import React, { useEffect, useState } from 'react';
import { Text, Container, Paper, Stack, Loader } from '@mantine/core';
import classes from './ApprovalTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';
import { LuChevronRightCircle } from "react-icons/lu";

type Investor = {
    id: number;
    first_name: string;
    last_name: string;
    nationality: string;
    passport_num: string;
    birth_date: string;
    address: string;
    occupation: string;
    income: number;
    passport_img: string;
    approvalStatus: string;
    user: {
        email: string;
    },
};

export function InvestorApprovalTable() {
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvestors = async () => {
            try {
                const response = await fetch('/api/admin/investor');
                if (!response.ok) {
                    throw new Error('Failed to fetch investors');
                }
                const data: Investor[] = await response.json();
                setInvestors(data);
            } catch (error: unknown) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchInvestors();
    }, []);

    if (loading) {
        return (
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                <Loader color="goldenrod" type="dots" />
            </Stack>
        );
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    if (investors.length === 0) {
        return (
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                <Text c="goldenrod">No pending investor available.</Text>
            </Stack>
        );
    }

    return (
        <Container>
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                {investors.map((investor) => (
                    <Paper
                        key={investor.id}
                        shadow="md"
                        radius="md"
                        p="xl"
                        className={`${classes.paper} ${arimoRegular.className}`}
                        onClick={() => window.location.href = `/admin/investor/${investor.id}`}
                    >
                        <Text className={classes.topic}>Name: {investor.first_name} {investor.last_name}</Text>
                        <Text><strong>Nationality</strong>: {investor.nationality}</Text>
                        <Text><strong>Email</strong>: {investor.user.email}</Text>
                        <Text className={classes.check}><LuChevronRightCircle size={25} fontWeight="bold" /></Text>
                    </Paper>
                ))}
            </Stack>
        </Container>
    );
}
