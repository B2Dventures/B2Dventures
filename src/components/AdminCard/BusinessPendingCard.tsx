import React, { useEffect, useState } from 'react';
import { Card, Text, Group } from '@mantine/core';
import classes from './AdminCard.module.css';
import { LuBriefcase } from "react-icons/lu";

interface CardProps {}

export const BusinessPendingCard: React.FC<CardProps> = () => {
    const [pendingCount, setPendingCount] = useState<number | null>(null); // Initial state is null to show loading

    useEffect(() => {
        const fetchPendingBusinesses = async () => {
            try {
                const response = await fetch('/api/admin/business');
                if (!response.ok) {
                    throw new Error('Failed to fetch businesses');
                }

                const businesses = await response.json();
                const pendingBusinesses = businesses.filter((business: { approvalStatus: string }) => business.approvalStatus === "PENDING");

                setPendingCount(pendingBusinesses.length);
            } catch (error) {
                console.error("Error fetching businesses:", error);
                setPendingCount(0);
            }
        };

        fetchPendingBusinesses();
    }, []);

    return (
        <a href={`/admin/business`} style={{ textDecoration: 'none' }}>
            <Card shadow="sm" padding="lg" radius="md" className={classes.card}>
                <Card.Section>
                    <div className={classes.box}>
                        <LuBriefcase size={100} color="indianred" />
                    </div>
                </Card.Section>

                <Group mt="md" mb="xs" className={classes.textContainer}>
                    <Text size="sm" className={classes.Text}>Business</Text>
                    <Text size="lg" fw="bold" className={classes.mainText}>
                        {pendingCount !== null ? pendingCount : '...'}
                    </Text>
                    <Text size="sm" className={classes.subText}>Pending</Text>
                </Group>
            </Card>
        </a>
    );
};
