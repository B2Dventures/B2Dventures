import React from 'react';
import {Card, Text, Group, Button} from '@mantine/core';
import classes from './AdminCard.module.css';
import {LuBriefcase, LuChevronRightCircle, LuUser, LuClipboardList} from "react-icons/lu";

interface CardProps {
}

export const CampaignPendingCard: React.FC<CardProps> = () => {
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
                    <Text size="lg" fw="bold" className={classes.mainText}>8</Text>
                    <Text size="sm" className={classes.subText}>Pending</Text>
                </Group>

            </Card>
        </a>
    );
};
