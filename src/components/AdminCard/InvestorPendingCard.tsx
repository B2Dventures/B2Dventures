import React, { useEffect, useState } from 'react';
import {Card, Text, Group, Loader} from '@mantine/core';
import classes from './AdminCard.module.css';
import { LuUser } from "react-icons/lu";

interface CardProps {}

export const InvestorPendingCard: React.FC<CardProps> = () => {
    const [pendingCount, setPendingCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchPendingInvestors = async () => {
            try {
                const response = await fetch('/api/admin/investor');
                if (!response.ok) {
                    throw new Error('Failed to fetch investors');
                }

                const investors = await response.json();
                const pendingInvestors = investors.filter((investor: { approvalStatus: string }) => investor.approvalStatus === "PENDING");

                setPendingCount(pendingInvestors.length);
            } catch (error) {
                console.error("Error fetching investors:", error);
                setPendingCount(0);
            }
        };

        fetchPendingInvestors();
    }, []);

    return (
        <a href={`/admin/investor`} style={{ textDecoration: 'none' }}>
            <Card shadow="sm" padding="lg" radius="md" className={classes.card}>
                <Card.Section>
                    <div className={classes.box}>
                        <LuUser size={100} color="indianred" />
                    </div>
                </Card.Section>

                <Group mt="md" mb="xs" className={classes.textContainer}>
                    <Text size="sm" className={classes.Text}>Investor</Text>
                    <Text size="lg" fw="bold" className={classes.mainText}>
                        {pendingCount !== null ? pendingCount : "..."}
                    </Text>
                    <Text size="sm" className={classes.subText}>Pending</Text>
                </Group>
            </Card>
        </a>
    );
};
