'use client';

import React, { useEffect, useState } from 'react';
import {Text, Container, Paper, Stack, Loader} from '@mantine/core';
import { LuChevronRightCircle } from 'react-icons/lu';

import { arimoRegular } from '@/app/(frontend)/styles/fonts';
import classes from './ApprovalTable.module.css';
import {adminBusiness} from "types/api";

export function BusinessApprovalTable() {
    const [businesses, setBusinesses] = useState<adminBusiness[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await fetch('/api/admin/business');
                if (!response.ok) {
                    throw new Error('Failed to fetch businesses');
                }
                const data: adminBusiness[] = await response.json();
                setBusinesses(data);
            } catch (error: unknown) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        void fetchBusinesses();
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

    if (businesses.length === 0) {
        return (
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                <Text c="goldenrod">No pending business available.</Text>
            </Stack>
        );
    }

    return (
        <Container>
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                {businesses.map((business) => (
                    <Paper
                        key={business.id}
                        shadow="md"
                        radius="md"
                        p="xl"
                        className={`${classes.paper} ${arimoRegular.className}`}
                        onClick={() => window.location.href = `/admin/business/${business.id}`}
                    >
                        <Text className={classes.topic}>Business Name: {business.business_name}</Text>
                        <Text><strong>Founder:</strong> {business.founder_first_name} {business.founder_last_name}</Text>
                        <Text><strong>Description:</strong> {business.business_detail}</Text>
                        <Text className={classes.industry}>
                            <strong>Category:</strong> {Array.isArray(business.industry) ? business.industry.join(', ') : 'Not specified'}
                        </Text>
                        <Text>
                            <strong>Email:</strong> {business.userEmail}
                        </Text>
                        <Text className={classes.check}>
                            <LuChevronRightCircle size={25} fontWeight="bold" />
                        </Text>
                    </Paper>
                ))}
            </Stack>
        </Container>
    );
}
