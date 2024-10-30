import React from 'react';
import {Card, Text, Group, Button} from '@mantine/core';
import classes from './AdminCard.module.css';
import {LuBriefcase, LuChevronRightCircle, LuUser} from "react-icons/lu";

interface CardProps {
}

export const InvestorPendingCard: React.FC<CardProps> = () => {
    return (
        <a href={`/admin/investor`} style={{textDecoration: 'none'}}>
            <Card shadow="sm" padding="lg" radius="md" className={classes.card}>
                <Card.Section>
                    <div className={classes.box}>
                        <LuUser size={100} color="indianred"/>
                    </div>
                </Card.Section>

                <Group mt="md" mb="xs" className={classes.textContainer}>
                    <Text size="sm" className={classes.Text}>Investor</Text>
                    <Text size="lg" fw="bold" className={classes.mainText}>12</Text>
                    <Text size="sm" className={classes.subText}>Pending</Text>
                </Group>

            </Card>
        </a>
    );
};
