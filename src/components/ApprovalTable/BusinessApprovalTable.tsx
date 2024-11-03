'use client';

import React, { useEffect, useState } from 'react';
import { Text, Container, Paper, Stack, Flex } from '@mantine/core';
import classes from './ApprovalTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';
import { LuChevronRightCircle } from 'react-icons/lu';

type Business = {
    id: number;
    business_name: string;
    founder_first_name: string;
    founder_last_name: string;
    market_cap: number;
    company_address: string;
    business_detail: string;
    industry: string;
    logo: string;
    license: string;
    registration_cer: string;
    approvalStatus: string;
    user: {
        email: string;
    };
};

export function BusinessApprovalTable() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await fetch('/api/admin/business');
                if (!response.ok) {
                    throw new Error('Failed to fetch businesses');
                }
                const data: Business[] = await response.json();
                setBusinesses(data);
            } catch (error: unknown) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    if (loading) {
        return <Text></Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
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
                        <Flex align="center" className={classes.descriptionGoal}>
                            <Text><strong>Description:</strong> {business.business_detail}</Text>
                            <Text className={classes.industry}><strong>Industry:</strong> {business.industry}</Text>
                        </Flex>
                        <Text>
                            <strong>Email:</strong> {business.user.email}
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
