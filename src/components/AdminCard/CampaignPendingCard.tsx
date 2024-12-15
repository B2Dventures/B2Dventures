import React, {useEffect, useState} from 'react';
import {Card, Text, Group, Button} from '@mantine/core';
import classes from './AdminCard.module.css';
import {LuBriefcase, LuChevronRightCircle, LuUser, LuClipboardList} from "react-icons/lu";
import {adminCampaign} from "types/api";

interface CardProps {
}

export const CampaignPendingCard: React.FC<CardProps> = () => {
    const [pendingCount, setPendingCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchPendingCampaigns = async () => {
            try {
                const response = await fetch('/api/admin/campaign');
                if (!response.ok) {
                    throw new Error('Failed to fetch campaigns');
                }

                const campaigns: adminCampaign[] = await response.json();
                const pendingCampaigns = campaigns.filter((campaign: { approvalStatus: string }) => campaign.approvalStatus === "PENDING");

                setPendingCount(pendingCampaigns.length);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
                setPendingCount(0);
            }
        };

        void fetchPendingCampaigns();
    }, []);

    return (
        <a href={`/admin/campaign`} style={{textDecoration: 'none'}}>
            <Card shadow="sm" padding="lg" radius="md" className={classes.card}>
                <Card.Section>
                    <div className={classes.box}>
                        <LuClipboardList size={100} color="indianred"/>
                    </div>
                </Card.Section>

                <Group mt="md" mb="xs" className={classes.textContainer}>
                    <Text size="sm" className={classes.Text}>Campaign</Text>
                    <Text size="lg" fw="bold" className={classes.mainText}>
                        {pendingCount !== null ? pendingCount : '...'}
                    </Text>
                    <Text size="sm" className={classes.subText}>Pending</Text>
                </Group>

            </Card>
        </a>
    );
};
