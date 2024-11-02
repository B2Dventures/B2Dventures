'use client';

import React from 'react';
import { Text, Container, Paper, Stack, Flex } from '@mantine/core';
import classes from './ApprovalTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';
import { LuChevronRightCircle } from 'react-icons/lu';

const elements = [
    { id: '1', campaign: 'B2Dventures', businessName: 'VoeVin corp.', description: 'An investment platform', goal: 10000, email: 'john.doe@gmail.com' },
    { id: '2', campaign: 'Startup World', businessName: 'Innovate Inc.', description: 'Tech innovations', goal: 50000, email: 'jane.smith@gmail.com' },
    { id: '3', campaign: 'Green Earth', businessName: 'Eco Solutions', description: 'Sustainable products', goal: 20000, email: 'chris.johnson@gmail.com' },
    { id: '4', campaign: 'Health Hub', businessName: 'MediLife', description: 'Healthcare services', goal: 30000, email: 'sara.lee@gmail.com' },
];

export function CampaignApprovalTable() {
    return (
        <Container>
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                {elements.map((element) => (
                    <Paper
                        key={element.id}
                        shadow="md"
                        radius="md"
                        p="xl"
                        className={`${classes.paper} ${arimoRegular.className}`}
                        onClick={() => window.location.href = `/admin/campaign/${element.id}`}
                    >
                        <Text className={classes.topic}>Campaign: {element.campaign}</Text>
                        <Text><strong>Business Name:</strong> {element.businessName}</Text>
                        <Flex align="center" className={classes.descriptionGoal}>
                            <Text><strong>Description:</strong> {element.description}</Text>
                            <Text className={classes.goal}><strong>Goal:</strong> ${element.goal}</Text>
                        </Flex>
                        <Text><strong>Email:</strong> {element.email}</Text>
                        <Text className={classes.check}>
                            <LuChevronRightCircle size={25} fontWeight="bold" />
                        </Text>
                    </Paper>
                ))}
            </Stack>
        </Container>
    );
}
