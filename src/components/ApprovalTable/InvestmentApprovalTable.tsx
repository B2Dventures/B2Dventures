'use client';

import React, { useEffect, useState } from 'react';
import {Text, Container, Paper, Stack, Flex, Loader} from '@mantine/core';
import classes from './ApprovalTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';
import { LuChevronRightCircle } from 'react-icons/lu';
import { adminInvestment } from "types/api";

export function InvestmentApprovalTable() {
    const [investments, setInvestments] = useState<adminInvestment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const response = await fetch('/api/admin/investment');
                if (!response.ok) {
                    throw new Error('Failed to fetch investments');
                }
                const data: adminInvestment[] = await response.json();
                setInvestments(data);
            } catch (error: unknown) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments()
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

    if (investments.length === 0) {
        return (
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                <Text c="goldenrod">No pending investments available.</Text>
            </Stack>
        );
    }


    return (
        <Container>
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                {investments.map((investment) => (
                    <Paper
                        key={investment.id}
                        shadow="md"
                        radius="md"
                        p="xl"
                        className={`${classes.paper} ${arimoRegular.className}`}
                        onClick={() => window.location.href = `/admin/campaign/${investment.id}`}
                    >
                        <Text className={classes.topic}>Investment: {investment.id}</Text>
                        <Text><strong>Investor Name:</strong> {investment.investorFirstName} {investment.investorLastName}</Text>
                        <Text><strong>Campaign Name:</strong> {investment.campaignName}</Text>
                        <Text><strong>Business Name:</strong> {investment.businessName}</Text>
                        <Flex align="center" className={classes.descriptionGoal}>
                            <Text><strong>DateTime:</strong> {new Date(investment.timestamp).toLocaleString()}</Text>
                            <Text className={classes.goal}><strong>Amount:</strong> $ {investment.amount}</Text>
                        </Flex>
                        <Text className={classes.check}>
                            <LuChevronRightCircle size={25} fontWeight="bold" />
                        </Text>
                    </Paper>
                ))}
            </Stack>
        </Container>
    );
}
