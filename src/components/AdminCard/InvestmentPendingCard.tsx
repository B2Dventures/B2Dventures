import React, {useEffect, useState} from 'react';
import {Card, Text, Group, Button} from '@mantine/core';
import classes from './AdminCard.module.css';
import {LuBriefcase, LuChevronRightCircle, LuUser, LuClipboardList, LuCoins} from "react-icons/lu";
import {adminInvestment} from "@/utils/types";

interface CardProps {
}

export const InvestmentPendingCard: React.FC<CardProps> = () => {
    const [pendingCount, setPendingCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchPendingInvestments = async () => {
            try {
                const response = await fetch('/api/admin/investment');
                if (!response.ok) {
                    throw new Error('Failed to fetch investments');
                }
                const investments: adminInvestment[] = await response.json();
                const pendingInvestments = investments.length;
                setPendingCount(pendingInvestments);
            } catch (error) {
                console.error("Error fetching investments:", error);
                setPendingCount(0);
            }
        };

        fetchPendingInvestments();
    }, []);

    return (
        <a href={`/admin/investment`} style={{textDecoration: 'none'}}>
            <Card shadow="sm" padding="lg" radius="md" className={classes.card}>
                <Card.Section>
                    <div className={classes.box}>
                        <LuCoins size={100} color="indianred"/>
                    </div>
                </Card.Section>

                <Group mt="md" mb="xs" className={classes.textContainer}>
                    <Text size="sm" className={classes.Text}>Investment</Text>
                    <Text size="lg" fw="bold" className={classes.mainText}>
                        {pendingCount !== null ? pendingCount : '...'}
                    </Text>
                    <Text size="sm" className={classes.subText}>Pending</Text>
                </Group>

            </Card>
        </a>
    );
};
