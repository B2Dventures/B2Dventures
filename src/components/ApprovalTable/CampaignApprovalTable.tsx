'use client';

import React, { useEffect, useState } from 'react';
import {Text, Container, Paper, Stack, Flex, Loader} from '@mantine/core';
import classes from './ApprovalTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';
import { LuChevronRightCircle } from 'react-icons/lu';

type Campaign = {
    id: number;
    name: string;
    description: string;
    goal: number;
    min_invest: number;
    start_date: string;
    end_date: string;
    status: string;
    image: string;
    approvalStatus: string;
    details: {
        highlight: string;
    };
    business: {
        business_name: string;
    };
};

export function CampaignApprovalTable() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('/api/admin/campaign');
                if (!response.ok) {
                    throw new Error('Failed to fetch campaigns');
                }
                const data: Campaign[] = await response.json();
                setCampaigns(data);
            } catch (error: unknown) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
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

    return (
        <Container>
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                {campaigns.map((campaign) => (
                    <Paper
                        key={campaign.id}
                        shadow="md"
                        radius="md"
                        p="xl"
                        className={`${classes.paper} ${arimoRegular.className}`}
                        onClick={() => window.location.href = `/admin/campaign/${campaign.id}`}
                    >
                        <Text className={classes.topic}>Campaign: {campaign.name}</Text>
                        <Text><strong>Business Name:</strong> {campaign.business.business_name}</Text>
                        <Flex align="center" className={classes.descriptionGoal}>
                            <Text><strong>Description:</strong> {campaign.description}</Text>
                            <Text className={classes.goal}><strong>Goal:</strong> ${campaign.goal}</Text>
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
